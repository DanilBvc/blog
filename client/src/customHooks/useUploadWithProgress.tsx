import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../utils/network';

export const useUploadProgress = (url: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [response, setResponse] = useState<string[]>([]);
  const uploadForm = async (formData: FormData) => {
    try {
      if (url.length > 0) {
        const responceUrl = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 50;
            setProgress(progress);
          },
          onDownloadProgress: (progressEvent) => {
            const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
            console.log(progress);
            setProgress(progress);
          },
        });
        setResponse((prev) => [...prev, `${baseUrl}${responceUrl.data.url}`]);
      }
    } catch (err) {
      console.log(err);
    }
    setIsSuccess(true);
  };

  return { uploadForm, isSuccess, progress, response };
};
