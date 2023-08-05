export type chatUploadingFileType = {
  uploadedFiles: {
    progress: number;
    file: string | null;
  }[];
  removeUploadedFile: (file: string) => void;
};
