import React, { FC, useState } from 'react';
import { numberPaginationProps } from './numberPagination.type';
import {
  leftArrow,
  rightDoubleArrow,
  strokeBottomArrow,
} from '../../../assets/studioIcons/studioIcons';
import './numberPagination.scss';
import DropDownList from '../dropDownList/dropDownList';
const NumberPagination: FC<numberPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handleSelectPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPageNumber = parseInt(event.target.value, 10);
    setSelectedPage(selectedPageNumber);
    onPageChange(selectedPageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setSelectedPage(prevPage);
      onPageChange(prevPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setSelectedPage(nextPage);
      onPageChange(nextPage);
    }
  };
  return (
    <div className="number-pagination-wrapper">
      <div className="items-on-page">
        Items on page: 30{' '}
        <DropDownList
          option={[
            {
              label: 10,
              onClick: () => {
                onPageChange(10);
              },
            },
            {
              label: 30,
              onClick: () => {
                onPageChange(10);
              },
            },
            {
              label: 50,
              onClick: () => {
                onPageChange(10);
              },
            },
          ]}
          placeHolder={strokeBottomArrow}
        />
      </div>
      <div className="current-page">31 out of {totalPages}</div>
      <div className="number-pagination-controlls">
        <div className="left-double-arrow arrow">{rightDoubleArrow}</div>
        <div className="left-arrow arrow" onChange={handlePrevPage}>
          {leftArrow}
        </div>
        <div className="right-arrow arrow" onChange={handleNextPage}>
          {leftArrow}
        </div>
        <div className="right-double-arrow arrow disabled">{rightDoubleArrow}</div>
      </div>
    </div>
  );
};

export default NumberPagination;
