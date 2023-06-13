import { FC } from 'react';
import './viewCheckMark.scss';
const ViewCheckMark: FC<{ viewed: boolean }> = ({ viewed }) => {
  return (
    <div className="checkbox-container">
      {viewed ? (
        <>
          {' '}
          <div className="check"></div>
          <div className="check check-2"></div>
        </>
      ) : (
        <>
          {' '}
          <div className="check-active"></div>
          <div className="check-active check-2"></div>
        </>
      )}
    </div>
  );
};
export default ViewCheckMark;
