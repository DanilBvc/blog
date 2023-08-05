/* eslint-disable @typescript-eslint/no-explicit-any */
export type dropDownListProps = {
  option: {
    label: any;
    onClick: () => void;
  }[];
  placeHolder: React.ReactNode;
  additionalClass?: string;
};
