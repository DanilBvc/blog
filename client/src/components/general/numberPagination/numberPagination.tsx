import React, { FC, useState } from 'react';
import { numberPaginationProps } from './numberPagination.type';
import { leftArrow, rightDoubleArrow } from '../../../assets/studioIcons/studioIcons';
import './numberPagination.scss';
const NumberPagination: FC<numberPaginationProps> = ({
  currentPage,
  totalPages,
  gridSize,
  onGridResize,
  onPageChange,
}) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handleResize = (size: number) => {
    if (size < totalPages) {
      onGridResize(size);
    }
  };

  const handlePrevPage = () => {
    if (currentPage - gridSize > 0) {
      const prevPage = currentPage - gridSize;
      setSelectedPage(prevPage);
      onPageChange(prevPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      const nextPage = currentPage + gridSize;
      setSelectedPage(nextPage);
      onPageChange(nextPage);
    }
  };
  return (
    <div className="number-pagination-wrapper">
      <div className="items-on-page">
        Items on page: {gridSize}
        <div className="items-on-page-wrapper">
          <div
            className="item-on-page"
            onClick={() => {
              handleResize(10);
            }}
          >
            10
          </div>
          <div
            className="item-on-page"
            onClick={() => {
              handleResize(30);
            }}
          >
            30
          </div>
          <div
            className="item-on-page"
            onClick={() => {
              handleResize(50);
            }}
          >
            50
          </div>
        </div>
      </div>
      <div className="current-page">
        {selectedPage}-{totalPages} out of {totalPages}
      </div>
      <div className="number-pagination-controlls">
        <div
          className="left-double-arrow arrow"
          onClick={() => {
            onPageChange(1);
          }}
        >
          {rightDoubleArrow}
        </div>
        <div className="left-arrow arrow" onClick={handlePrevPage}>
          {leftArrow}
        </div>
        <div className="right-arrow arrow" onClick={handleNextPage}>
          {leftArrow}
        </div>
        <div
          className="right-double-arrow arrow disabled"
          onClick={() => {
            onPageChange(totalPages);
          }}
        >
          {rightDoubleArrow}
        </div>
      </div>
    </div>
  );
};

export default NumberPagination;
