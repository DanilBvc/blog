import { FC, ReactNode } from 'react';
import './blockWrapper.scss';
const BlockWrapper: FC<{ children: ReactNode; additionalClass?: string; display?: boolean }> = ({
  children,
  additionalClass,
  display = true,
}) => {
  return (
    <>
      {display ? (
        <div className={`block-wrapper ${additionalClass ? additionalClass : ''}`}>{children}</div>
      ) : null}
    </>
  );
};
export default BlockWrapper;
