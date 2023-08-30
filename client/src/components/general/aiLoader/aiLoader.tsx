import React, { FC, ReactNode } from 'react';
import './aiLoader.scss';
const AiLoader: FC<{ children?: ReactNode; loading: boolean }> = ({ children, loading }) => {
  return (
    <>
      {loading ? (
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default AiLoader;
