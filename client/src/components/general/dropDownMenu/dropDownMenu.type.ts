export type dropDownMenuProps = {
  menuData: dropDownMenu[] | dropDownMenu;
};
type dropDownMenu = {
  name: string;
  icon?: JSX.Element;
  subitems: subItems[];
};

export type subItems = {
  name: string;
  url?: string;
  onClick?: () => void;
  icon?: JSX.Element;
};
