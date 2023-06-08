import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notFound/notFound';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import PrivateRoute from './privateRoute';
import Profile from './pages/profile/profile';
import People from './pages/people/people';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/people" element={<People />} />
      </Route>
    </Routes>
  );
};

export default Router;
