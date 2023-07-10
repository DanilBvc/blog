import {
  MessageItem,
  chatDataResponse,
  whoAmIResponseType,
} from '../../../../../generallType/generallType';

export type chatMessageItemType = {
  senderData: whoAmIResponseType;
  chat: MessageItem;
  chatData: chatDataResponse;
  handleContextMenu: (e: React.MouseEvent<HTMLDivElement>, messageId: string) => void;
};
