import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notFound/notFound';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
