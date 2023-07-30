import React, { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { NavItemProps } from './navigationItem.type';
import { vector } from '../../../../../assets/global';
import './navigationItem.scss';
// Assuming the icons are properly imported from the asset path.

const NavBarItem: FC<NavItemProps> = ({
  text,
  menuItems,
  index,
  icon,
  activeCategory,
  setActiveCategory,
}) => {
  const onClickCallback = useCallback(() => {
    setActiveCategory((prevCategory) => (prevCategory === index ? 0 : index));
  }, [index, setActiveCategory]);

  const isActive = activeCategory === index;
  const menuHeight = isActive ? `${menuItems.length * 4.3 + 5.2}vw` : '5.2vw';

  return (
    <div
      onClick={onClickCallback}
      className={`navitem ${isActive ? 'active' : ''}`}
      style={{ minHeight: menuHeight, maxHeight: menuHeight }}
    >
      <div className="navitem-header">
        <div className="navitem-header-text">
          <span className="navitem-header-icons">{icon}</span>
          <p>{text}</p>
        </div>
        <span className={`navitem-header-vector ${isActive ? 'rotated' : ''}`}>{vector}</span>
      </div>
      <div className={`navitem-item-container ${isActive ? '' : 'hidden'}`}>
        {menuItems.map((item, i) => (
          <Link
            className="navbar-link"
            onClick={() => setActiveCategory(0)}
            to={item.url as string}
            key={i}
          >
            {item.icon}
            <p>{item.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBarItem;
