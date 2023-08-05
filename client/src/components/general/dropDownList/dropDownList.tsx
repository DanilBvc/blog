import React, { FC, useEffect, useState } from 'react';
import { dropDownListProps } from './dropDownList.type';
import './dropDownList.scss';
const DropDownList: FC<dropDownListProps> = ({ option, placeHolder, additionalClass }) => {
  const [listState, setListState] = useState(false);
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dropdownElement = document.querySelector('.dropdown');
    if (dropdownElement && !dropdownElement.contains(target)) {
      setListState(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="drop-down-list">
      <div className={`drop-down-options ${!listState ? 'hidden' : ''}`}>
        {option.map((o) => (
          <div
            className="option-item"
            onClick={() => {
              o.onClick();
              setListState(false);
            }}
            key={o.label}
          >
            {o.label}
          </div>
        ))}
      </div>
      <div
        className={`drop-down-placeHolder ${additionalClass}`}
        onClick={(e) => {
          e.stopPropagation();
          setListState(!listState);
        }}
      >
        {placeHolder}
      </div>
    </div>
  );
};

export default DropDownList;
