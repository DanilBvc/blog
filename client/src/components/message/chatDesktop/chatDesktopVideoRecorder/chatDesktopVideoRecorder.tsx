import { FC, useRef } from 'react';
import Modal from '../../../general/modal/modal';
import './chatDesktopVideoRecorder.scss';
import SubmitButton from '../../../general/submitButton/submitButton';
import axios from 'axios';
import { baseUrl, uploadFiles } from '../../../../utils/network';
import { v4 as uuidv4 } from 'uuid';
interface customBlob extends Blob {
  originalName: string;
}
const ChatDesktopVideoRecorder: FC<{
  open: boolean;
  close: () => void;
  chatId: string | null;
  videoFileHandler: (file: string) => void;
}> = ({ open, close, chatId, videoFileHandler }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      videoRef.current!.srcObject = stream;

      const options = { mimeType: 'video/webm; codecs=vp9' };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current && videoRef.current?.srcObject && chatId) {
      mediaRecorderRef.current.stop();

      const videoStream = videoRef.current.srcObject as MediaStream;
      videoStream.getTracks().forEach((track) => track.stop());

      const blobParts = chunksRef.current;
      const options = { type: 'video/webm' };
      const recordedBlob = new Blob(blobParts, options) as customBlob;
      const originalName = `${uuidv4()}.webm`;
      const formData = new FormData();
      formData.append('file', recordedBlob, originalName);
      const videoUrl = await axios.post(uploadFiles(chatId), formData);
      videoFileHandler(`${baseUrl}${videoUrl.data.url}`);
      close();
    }
  };

  return (
    <>
      <Modal closeModal={close} open={open} additionalClass={''}>
        <div className="video-recorder-wrapper">
          <div className="video-recorder-overview">
            <span className="video-recorder-title">Video Recorder</span>
            <video className="video-recorder" ref={videoRef} autoPlay muted />
          </div>
          <div className="video-recorder-buttons">
            <div className="video-recorder-button">
              <SubmitButton text="Start" onClick={startRecording} />
            </div>
            <div className="video-recorder-button">
              <SubmitButton text="Stop" onClick={stopRecording} />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ChatDesktopVideoRecorder;
