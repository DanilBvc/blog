import { useState, useEffect, FC } from 'react';
import './dropDownMenu.scss';
import { dropDownMenuProps } from './dropDownMenu.type';

const DropDownMenu: FC<dropDownMenuProps> = ({ icon, menuItems }) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown`}>
      <div
        className="dropdown-main-element"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        {icon}
      </div>
      {open ? (
        <div className={`dropdown-wrapper dropdown-animation`}>
          <ul className="dropdown-menu">
            {menuItems.map((menuItem, index) => (
              <li
                key={index}
                onClick={() => {
                  menuItem.onClick();
                  setOpen(false);
                }}
              >
                {menuItem.label}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default DropDownMenu;
