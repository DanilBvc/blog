import { FC } from 'react';
import { SearchProps } from './search.type';
import './search.scss';
import { lens } from '../../../assets/global';
const Search: FC<SearchProps> = ({ onChange, value, placeholder }) => {
  return (
    <div className="search-wrapper">
      <div className="search-container">
        {/* {lens} */}
        <input
          onChange={(e) => {
            onChange(e);
          }}
          value={value}
          type="text"
          name="search"
          id="search"
          className="search-input"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
export default Search;
