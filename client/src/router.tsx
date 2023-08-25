import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import PrivateRoute from './privateRoute';
import { routes } from './routes';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
