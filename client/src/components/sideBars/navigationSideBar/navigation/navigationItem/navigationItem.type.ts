type subItemProps = {
  name: string;
  url: string;
  icon: JSX.Element;
};

export type navbarProps = {
  name: string;
  url: string;
  icon: JSX.Element;
  subitems: subItemProps[];
};

export type NavItemProps = {
  index: number;
  icon?: JSX.Element;
  text: string;
  menuItems: subItemProps[];
  activeCategory: number;
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>;
};
