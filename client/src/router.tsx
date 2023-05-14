import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notFound/notFound';
import Login from './pages/login/login';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/accept-invitation/register/:token" element={<AcceptInvitationRegister />} />
      <Route path="/accept-invitation/login/:token" element={<AcceptInvitationLogin />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
