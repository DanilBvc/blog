import { FC } from 'react';
import { SearchProps } from './search.type';
import './search.scss';
const Search: FC<SearchProps> = ({ onChange, value, placeholder, children, additionalClass }) => {
  return (
    <div className="search-wrapper">
      <div className={`search-container ${additionalClass}`}>
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
        {children}
      </div>
    </div>
  );
};
export default Search;
