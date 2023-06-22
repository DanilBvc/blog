export type contextMenuType = {
  open: boolean;
  contextMenuData: {
    coords: {
      x: number;
      y: number;
    };
    messageId: string;
  };
};

export enum contextMenuOption {
  REPLY = 'REPLY',
  EDIT = 'EDIT',
  COPY = 'COPY',
  FORWARD = 'FORWARD',
  PIN_THIS_MESSAGE = 'PIN_THIS_MESSAGE',
  DELETE_FOR_ME = 'DELETE_FOR_ME',
}
