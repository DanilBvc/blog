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
