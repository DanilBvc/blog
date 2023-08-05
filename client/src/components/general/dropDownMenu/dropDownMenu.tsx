import { useState, useEffect, FC } from 'react';
import './dropDownMenu.scss';
import SubDropDownMenu from './dropDownMenuItem/subDropDownMenu';
import { dropDownMenuProps } from './dropDownMenu.type';

const DropDownMenu: FC<dropDownMenuProps> = ({ menuData, open = true }) => {
  const [activeCategory, setActiveCategory] = useState<number>(-1);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(target)) {
      setActiveCategory(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {open ? (
        <div className="dropDown">
          <div className="dropDown-wrapper">
            <div className="dropDown-container">
              {Array.isArray(menuData) ? (
                menuData.map((data, index) => (
                  <SubDropDownMenu
                    key={index}
                    index={index}
                    text={data.name}
                    icon={data.icon}
                    menuItems={data.subitems}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />
                ))
              ) : (
                <SubDropDownMenu
                  index={0}
                  icon={menuData.icon}
                  text={menuData.name}
                  menuItems={menuData.subitems}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DropDownMenu;
