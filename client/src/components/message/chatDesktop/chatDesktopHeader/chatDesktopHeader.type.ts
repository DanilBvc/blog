import { whoAmIResponseType } from '../../../../generallType/generallType';
import { receipmentModalOptions } from '../chatDesktopInput/receipmentModal/receipmentModal.type';

export type chatDesktopHeaderType = {
  userData: whoAmIResponseType;
  handleModal: (option: receipmentModalOptions | null, open: boolean) => void;
};
