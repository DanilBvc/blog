import React, { FC } from 'react';
import { inputRangeProps } from './inputRange.type';
import './inputRange.scss';
const InputRange: FC<inputRangeProps> = ({ value, onChange, placeHolder, max, min }) => {
  return (
    <div className="input-range-wrapper">
      <div className="input-range-info">
        <div className="input-range-placeholder">{placeHolder}</div>
        <div className="input-range-counter">
          <input
            type="number"
            max={max}
            min={min}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="input-range">
        <input
          type="range"
          max={max}
          min={min}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default InputRange;
