import './formError.scss';
import { FC } from 'react';
import { formErrorProps } from './formError.type';
import { errorAlert } from '../../../assets/generalIcons/checkBoxIcons';

const FormError: FC<formErrorProps> = ({ errorText, appear }) => {
  return (
    <>
      {appear ? (
        <div className="error-container">
          {errorAlert}
          <p>{errorText}</p>
        </div>
      ) : null}
    </>
  );
};

export default FormError;
