export type chatDesktopVideoRecorder = {
  open: boolean;
  close: () => void;
  chatId: string | null;
  videoFileHandler: (formData: FormData) => void;
};
