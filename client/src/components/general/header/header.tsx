import { useAppSelector } from '../../../store/hooks/redux';
import UserAvatar from '../userAvatar/userAvatar';
import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  const userData = useAppSelector((state) => state.userDataReducer);
  return (
    <div className="header-container">
      <Link className="navbar-link" to={`/`}>
        feed
      </Link>
      <Link className="navbar-link" to={`/profile/${userData?._id}`}>
        <UserAvatar />
        profile
      </Link>
    </div>
  );
};

export default Header;
