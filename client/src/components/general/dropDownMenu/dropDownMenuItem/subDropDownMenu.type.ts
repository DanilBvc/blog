import { subItems } from '../dropDownMenu.type';

export type subDropDownMenuProps = {
  index: number;
  icon?: JSX.Element;
  text: string;
  menuItems: subItems[];
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
};
