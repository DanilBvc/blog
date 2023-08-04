export type editStudioModalProps = {
  open: boolean;
  close: () => void;
  videoUrl: string;
  preview?: string;
  description?: string;
};

export const defaultVideoData = {
  fileName: '',
  extension: '',
  description: '',
  preview: null,
};
