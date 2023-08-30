import { Link } from 'react-router-dom';
import { routeType } from '../../../routes';

export const filterRoutes = (routes: routeType[], value: string) => {
  return routes
    .filter(
      (route) =>
        route.name.toLowerCase().includes(value.toLowerCase()) && route.search && value.length > 0
    )
    .map((route, index) =>
      route.search ? (
        <Link to={route.path} key={index}>
          {route.name}
        </Link>
      ) : null
    );
};
