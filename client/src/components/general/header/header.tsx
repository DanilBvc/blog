import { useState } from 'react';
import { logo } from '../../../assets/global';
import { useAppSelector } from '../../../store/hooks/redux';
import UserAvatar from '../userAvatar/userAvatar';
import './header.scss';
import { Link } from 'react-router-dom';
import SearchDropDown from '../searchDropDown/searchDropDown';

const Header = () => {
  const userData = useAppSelector((state) => state.userDataReducer);
  const [search, setSearch] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div className="header-container">
      <Link to={'/'}>
        <div className="header-container-left">
          <div className="header-logo">{logo}</div>
          <div className="header-title">SpacePark</div>
        </div>
      </Link>
      <div className="header-container-right">
        <div className="header-container-search">
          <SearchDropDown onChange={handleSearch} value={search} placeholder="Search" />
          {/* <Search onChange={handleSearch} value={search} placeholder="Search" /> */}
        </div>
        <div className="header-container-avatar">
          <Link className="navbar-link" to={`/profile/${userData?._id}`}>
            <UserAvatar />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
