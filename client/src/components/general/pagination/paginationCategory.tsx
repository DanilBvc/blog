import React, { FC, useEffect, useState } from 'react';
import { paginationCategoryProps } from './paginationCategory.type';
import './paginationCategory.scss';
import { Link, useLocation } from 'react-router-dom';
const PaginationCategory: FC<paginationCategoryProps> = ({ list }) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('');
  useEffect(() => {
    setActiveCategory(location.pathname);
  }, [location.pathname]);
  return (
    <div className="pagination-category-wrapper">
      {list.map((c) => (
        <span
          className={`pagination-category-item ${
            activeCategory === c.link ? 'active-category' : ''
          }`}
          key={c.category}
        >
          <Link to={c.link}>{c.category}</Link>
        </span>
      ))}
    </div>
  );
};

export default PaginationCategory;
