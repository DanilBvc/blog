export type browseFileModal = {
  inputFileOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputOnDropEvent: React.DragEventHandler<HTMLDivElement>;
  closeModal: () => void;
  open: boolean;
  inputText: string;
  multiple: boolean;
};
