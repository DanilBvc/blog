import { messageTypes, whoAmIResponseType } from '../../../../../generallType/generallType';

export type chatActionBannerType = {
  close: () => void;
  actionBannerOption: {
    option: actionBanerOption;
    messageId: string;
    message: (messageTypes & { _id: string; date: string; files: string[] }) | undefined;
  } | null;
  userData: whoAmIResponseType | null;
};
export enum actionBanerOption {
  EDIT = 'EDIT',
  REPLY = 'REPLY',
}
