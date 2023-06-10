import { useState, useEffect, FC } from 'react';
import './dropDownMenu.scss';
import { dropDownMenuProps } from './dropDownMenu.type';
const DropDownMenu: FC<dropDownMenuProps> = ({ icon, menuItems }) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={`dropdown `}>
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
        <div className={`dropdown-wrapper ${open ? 'dropdown-animation' : ''}`}>
          <ul className="dropdown-menu">{menuItems}</ul>
        </div>
      ) : null}
    </div>
  );
};
export default DropDownMenu;
