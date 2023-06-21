import { messageTypes, whoAmIResponseType } from '../../../../../generallType/generallType';

export type chatMessageItemType = {
  senderData: whoAmIResponseType;
  chat: messageTypes & {
    _id: string;
    date: string;
    files: string[] | null;
  };
  handleContextMenu: (e: React.MouseEvent<HTMLDivElement>, messageId: string) => void;
};
