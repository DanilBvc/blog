import './inputField.scss';
import { FC } from 'react';
import { inputFieldProps } from './inputField.type';

const InputField: FC<inputFieldProps> = ({
  type,
  name,
  value,
  isSearch = false,
  placeholder,
  label = null,
  onChange,
  onBlur,
  ...addtionalProps
}) => {
  return label ? (
    <div className="input-field-input">
      <label htmlFor={name}>{label}</label>
      <div className="input-field-container">
        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          name={name}
          {...addtionalProps}
        />
      </div>
    </div>
  ) : (
    <div className="input-field-container">
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        {...addtionalProps}
      />
    </div>
  );
};

export default InputField;
