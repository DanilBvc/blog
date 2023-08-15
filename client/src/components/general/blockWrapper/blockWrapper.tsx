import { FC, ReactNode } from 'react';
import './blockWrapper.scss';
const BlockWrapper: FC<{
  children: ReactNode;
  additionalClass?: string;
  display?: boolean;
  onClick?: () => void;
}> = ({ children, additionalClass, display = true, onClick }) => {
  return (
    <>
      {display ? (
        <div
          onClick={onClick}
          className={`block-wrapper ${additionalClass ? additionalClass : ''}`}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};
export default BlockWrapper;
