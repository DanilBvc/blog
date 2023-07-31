export type editStudioModalProps = {
  open: boolean;
  close: () => void;
  videoUrl: string;
};

export const defaultVideoData = {
  fileName: '',
  extension: '',
  description: '',
  preview: null,
};
