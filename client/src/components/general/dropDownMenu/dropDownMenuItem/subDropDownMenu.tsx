import React, { FC, useCallback } from 'react';
import './subDropDownMenu.scss';
import { Link } from 'react-router-dom';
import { vector } from '../../../../assets/global';
import { subDropDownMenuProps } from './subDropDownMenu.type';
const SubDropDownMenu: FC<subDropDownMenuProps> = ({
  setActiveCategory,
  activeCategory,
  index,
  icon,
  text,
  menuItems,
}) => {
  const onClickCallback = useCallback(() => {
    setActiveCategory((prevCategory) => (prevCategory === index ? -1 : index));
  }, [index, setActiveCategory]);

  const isActive = activeCategory === index;
  const menuHeight = isActive ? `${menuItems.length * 4.3 + 5.2}vw` : '5.2vw';
  return (
    <div
      onClick={onClickCallback}
      className={`dropDown-item ${isActive ? 'active' : ''}`}
      style={{ minHeight: menuHeight, maxHeight: menuHeight }}
    >
      <div className="dropDown-item-header">
        <div className="dropDown-item-text">
          <span className="dropDown-header-icons">{icon}</span>
          <p>{text}</p>
        </div>
        <span className={`dropDown-header-vector ${isActive ? 'rotated' : ''}`}>{vector}</span>
      </div>
      <div className={`dropDown-item-container ${isActive ? '' : 'hidden'}`}>
        {menuItems.map((item, i) => {
          const itemCallBack = item.onClick;
          const itemUrl = item.url;
          if (itemUrl) {
            return (
              <Link
                className="dropDown-link"
                onClick={() => {
                  setActiveCategory(-1);
                }}
                to={itemUrl}
                key={i}
              >
                {item.icon}
                <p>{item.name}</p>
              </Link>
            );
          }
          if (itemCallBack) {
            return (
              <div className="dropDown-link" onClick={itemCallBack} key={i}>
                {item.icon}
                <p>{item.name}</p>
              </div>
            );
          }
          return (
            <div className="dropDown-link" key={i}>
              {item.icon}
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubDropDownMenu;
