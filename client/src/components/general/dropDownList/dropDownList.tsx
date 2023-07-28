import React, { FC, useState } from 'react';
import { dropDownListProps } from './dropDownList.type';
import './dropDownList.scss';
const DropDownList: FC<dropDownListProps> = ({ option, placeHolder, onClick }) => {
  const [listState, setListState] = useState(false);
  return (
    <div className="drop-down-list">
      <div className={`drop-down-options ${!listState ? 'hidden' : ''}`}>
        {option.map((o) => (
          <div
            className="option-item"
            onClick={() => {
              onClick(o);
              setListState(false);
            }}
            key={o}
          >
            {o}
          </div>
        ))}
      </div>
      <div
        className="drop-down-placeHolder"
        onClick={() => {
          setListState(!listState);
        }}
      >
        {placeHolder}
      </div>
    </div>
  );
};

export default DropDownList;
