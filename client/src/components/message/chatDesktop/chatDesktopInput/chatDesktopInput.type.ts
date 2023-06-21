import { messageTypes } from '../../../../generallType/generallType';
import { receipmentModalOptions } from './receipmentModal/receipmentModal.type';

export type chatDesktopInputType = {
  sendMessage: (payload: messageTypes) => void;
  handleModal: (option: receipmentModalOptions | null, open: boolean) => void;
  receipmentModalOption: {
    option: receipmentModalOptions | null;
    open: boolean;
  };
  uploadedFiles: {
    progress: number;
    file: string | null;
  }[];
  removeUploadedFile: (file: string) => void;
};
