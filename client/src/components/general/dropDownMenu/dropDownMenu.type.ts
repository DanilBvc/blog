import { ReactNode } from 'react';

export type dropDownMenuProps = {
  icon: React.ReactNode;
  menuItems: {
    label: ReactNode;
    onClick: () => void;
  }[];
};
