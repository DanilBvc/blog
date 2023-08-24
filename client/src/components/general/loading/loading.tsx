import { FC, ReactNode } from 'react';
import './loading.scss';
const Loading: FC<{ children?: ReactNode; loading: boolean }> = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <div className="simple-spinner">
          <span></span>
        </div>
      ) : (
        children
      )}
    </>
  );
};
export default Loading;
