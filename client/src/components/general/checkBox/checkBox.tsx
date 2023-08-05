import './checkBox.scss';
import { FC } from 'react';
import { checkBoxProps } from './checkBox.type';

const CheckBox: FC<checkBoxProps> = ({ isChecked = false, setIsChecked, label }) => {
  const check = () => setIsChecked(!isChecked);

  return (
    <div className="checkbox-container">
      <div className="checkbox" onClick={check}>
        <span className={isChecked ? 'checked' : 'unchecked'}></span>
      </div>
      <p className="checkbox-label" onClick={() => setIsChecked(!isChecked)}>
        {label}
      </p>
    </div>
  );
};

export default CheckBox;
