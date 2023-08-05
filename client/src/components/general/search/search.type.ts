import { ChangeEventHandler } from 'react';

export type SearchProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
};
