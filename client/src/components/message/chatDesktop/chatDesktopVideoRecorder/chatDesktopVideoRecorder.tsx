import { FC, useEffect, useRef, useState } from 'react';
import Modal from '../../../general/modal/modal';
import './chatDesktopVideoRecorder.scss';
import SubmitButton from '../../../general/submitButton/submitButton';
import { v4 as uuidv4 } from 'uuid';
import { chatDesktopVideoRecorder } from './chatDesktopVideoRecorder.type';
interface customBlob extends Blob {
  originalName: string;
}

const ChatDesktopVideoRecorder: FC<chatDesktopVideoRecorder> = ({
  open,
  close,
  chatId,
  videoFileHandler,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [blobParts, setBlobParts] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const startRecording = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      videoRef.current!.srcObject = stream;

      const options = { mimeType: 'video/webm; codecs=vp9' };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = async (e) => {
        if (e.data && e.data.size > 0) {
          await new Promise((resolve) => {
            setBlobParts((prev) => {
              const updBlobParts = [...prev, e.data];
              resolve(updBlobParts);
              return [...prev, e.data];
            });
          });
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleFile = (blobParts: Blob[]) => {
    const options = { type: 'video/webm' };
    const recordedBlob = new Blob(blobParts, options) as customBlob;
    const originalName = `${uuidv4()}.webm`;
    const formData = new FormData();
    formData.append('file', recordedBlob, originalName);
    videoFileHandler(formData);
    setIsRecording(false);
    close();
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && videoRef.current?.srcObject && chatId) {
      mediaRecorderRef.current.stop();

      const videoStream = videoRef.current.srcObject as MediaStream;
      videoStream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (blobParts.length > 0) {
      handleFile(blobParts);
    }
  }, [blobParts]);

  return (
    <>
      <Modal closeModal={close} open={open} additionalClass={''}>
        <div className="video-recorder-wrapper">
          <div className="video-recorder-overview">
            <span className="video-recorder-title">Video Recorder</span>
            <video className="video-recorder" ref={videoRef} autoPlay muted />
          </div>
          <div className="video-recorder-buttons">
            {!isRecording ? (
              <div className="video-recorder-button">
                <SubmitButton text="Start" onClick={startRecording} />
              </div>
            ) : null}

            {isRecording ? (
              <div className="video-recorder-button">
                <SubmitButton text="Stop" onClick={stopRecording} />
              </div>
            ) : null}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ChatDesktopVideoRecorder;
