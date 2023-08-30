import React, { FC, useMemo } from 'react';
import Search from '../search/search';
import { searchDropDownProps } from './searchDropDown.type';
import { routes } from '../../../routes';
import './searchDropDown.scss';
import { filterRoutes } from './searchDropDownHelper';
const SearchDropDown: FC<searchDropDownProps> = ({ onChange, value, placeholder }) => {
  const filteredRoutes = useMemo(() => filterRoutes(routes, value), [routes, value]);

  return (
    <Search
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      additionalClass={` ${filteredRoutes.length > 0 ? 'search-dropDown-container' : ''}`}
    >
      {filteredRoutes.length > 0 ? <div className={`search-dropDown`}>{filteredRoutes}</div> : null}
    </Search>
  );
};

export default SearchDropDown;
