import { FC, ReactNode } from 'react';
import './navigationItem.scss';
import { emptyCircle } from '../../../../../assets/global';
import { Link } from 'react-router-dom';
const NavigationItem: FC<{
  title: string;
  svg: ReactNode;
  notification?: number;
  path: string;
}> = ({ title, svg, notification, path }) => {
  return (
    <Link to={path}>
      {' '}
      <div className="navigation-item">
        <div className="navigation-static">
          <div className="navigation-item-img">{svg}</div>
          <div className="navigation-item-title">{title}</div>
        </div>
        <div className="navigation-item-notification">
          {notification ? emptyCircle(notification) : null}
        </div>
      </div>
    </Link>
  );
};
export default NavigationItem;
