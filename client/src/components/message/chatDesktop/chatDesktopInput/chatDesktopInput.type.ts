import { messageTypes, whoAmIResponseType } from '../../../../generallType/generallType';
import { actionBanerOption } from './chatActionBanner/chatActionBanner.type';
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
  actionBannerOption: {
    option: actionBanerOption;
    messageId: string;
    message: (messageTypes & { _id: string; date: string; files: string[] }) | undefined;
  } | null;
  closeActionBanner: () => void;
  userData: whoAmIResponseType | null;
};
