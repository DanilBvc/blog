import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notFound/notFound';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Home from './pages/home/home';
import PrivateRoute from './privateRoute';
import Profile from './pages/profile/profile';
import People from './pages/people/people';
import UserProfile from './pages/userProfile/userProfile';
import Message from './pages/message/message';
import ChatDesktop from './components/message/chatDesktop/chatDesktop';
import Studio from './pages/studio/studio';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="/people" element={<People />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/message" element={<Message />} />
        <Route path="/studio/:category" element={<Studio />} />
        <Route
          path="/message/:id"
          element={
            <Message>
              <ChatDesktop />
            </Message>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
