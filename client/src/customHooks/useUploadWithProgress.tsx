import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/network';

export const useUploadProgress = (url: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ progress: number; file: string | null }[]>(
    []
  );
  const uploadForm = async (formData: FormData) => {
    try {
      if (url.length > 0) {
        const responseUrl = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 50;
            setUploadedFiles((prev) => [...prev, { progress, file: null }]);
          },
          onDownloadProgress: (progressEvent) => {
            const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
            setUploadedFiles((prev) => [...prev.slice(0, -1), { ...prev.slice(-1)[0], progress }]);
          },
        });

        setUploadedFiles((prev) => [
          ...prev.slice(0, -1),
          { ...prev.slice(-1)[0], progress: 100, file: `${baseUrl}${responseUrl.data.url}` },
        ]);
      }
    } catch (err) {
      console.log(err);
    }
    setIsSuccess(true);
  };

  return { uploadForm, isSuccess, uploadedFiles, setUploadedFiles };
};
