import {
  MessageItem,
  chatDataResponse,
  whoAmIResponseType,
} from '../../../../generallType/generallType';
import { contextMenuOption } from '../../contextMenu/contextMenu.type';

export type chatDesktopContentType = {
  chatData: chatDataResponse;
  userData: whoAmIResponseType;
  closeContextMenu: () => void;
  contextMenuData: {
    coords: {
      x: number;
      y: number;
    };
    messageId: string;
  };
  handleContextMenu: (e: React.MouseEvent<HTMLDivElement>, messageId: string) => void;
  handleContextMenuAction: (contextMenuAction: contextMenuOption) => void;
  messagesWrapperReference: React.RefObject<HTMLDivElement>;
  setPinnedMessage: React.Dispatch<
    React.SetStateAction<{
      message: MessageItem | undefined;
      coords: { x: number; y: number };
    }>
  >;
};
