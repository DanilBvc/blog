import './submitButton.scss';
import { FC } from 'react';
import { submitbuttonProps } from './submitButton.type';

const SubmitButton: FC<submitbuttonProps> = ({ text, type, onClick }) => {
  return (
    <button className="submit-button" type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default SubmitButton;
