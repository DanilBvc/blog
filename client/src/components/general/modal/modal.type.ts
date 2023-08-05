import { ReactNode } from 'react';

export type modalProps = {
  closeModal: () => void;
  closeButton?: boolean;
  open: boolean;
  additionalClass?: string;
  children: ReactNode;
};
