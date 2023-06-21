export type receipmentModalType = {
  open: boolean;
  receipmentHandler: (option: receipmentModalOptions | null, open: boolean) => void;
};

export enum receipmentModalOptions {
  FILES = 'FILES',
  VIDEO = 'VIDEO',
}
