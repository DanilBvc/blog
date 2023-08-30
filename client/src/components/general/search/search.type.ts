import React from 'react';

export type SearchProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  children?: React.ReactNode;
  additionalClass?: string;
};
