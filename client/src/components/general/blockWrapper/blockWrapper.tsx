import { FC, ReactNode } from 'react';
import './blockWrapper.scss';
const BlockWrapper: FC<{ children: ReactNode; additionalClass?: string }> = ({
  children,
  additionalClass,
}) => {
  return (
    <div className={`block-wrapper ${additionalClass ? additionalClass : ''}`}>{children}</div>
  );
};
export default BlockWrapper;
