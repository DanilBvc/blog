import './header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  const avatar = localStorage.getItem('avatar');

  return (
    <div className="header-container">
      <Link className="navbar-link" to={`/`}>
        feed
      </Link>
      <Link className="navbar-link" to={`/profile/`}>
        {avatar && avatar != 'null' ? <img className="img" src={avatar} alt="" /> : ''}
        profile
      </Link>
    </div>
  );
};

export default Header;
