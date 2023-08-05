import { InputHTMLAttributes } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type inputFieldProps = {
  type: string;
  placeholder?: string;
  name: string;
  isSearch?: boolean;
  minLength?: number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
  label?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;
