import ChatDesktop from './components/message/chatDesktop/chatDesktop';
import Home from './pages/home/home';
import Message from './pages/message/message';
import NotFound from './pages/notFound/notFound';
import People from './pages/people/people';
import Profile from './pages/profile/profile';
import Shorts from './pages/shorts/shorts';
import Studio from './pages/studio/studio';
import UserProfile from './pages/userProfile/userProfile';
import Video from './pages/video/video';
import VideoView from './pages/videoView/videoView';
export type routeType = {
  path: string;
  element: React.ReactNode;
  name: string;
  search: boolean;
};
export const routes: routeType[] = [
  { path: '/', element: <Home />, name: 'Home', search: true },
  { path: '/profile/:id', element: <Profile />, name: 'Profile', search: false },
  { path: '/people', element: <People />, name: 'Social', search: true },
  { path: '/user', element: <UserProfile />, name: 'Profile', search: false },
  { path: '/message', element: <Message />, name: 'Messages', search: true },
  { path: '/studio/:category', element: <Studio />, name: 'Studio', search: false },
  { path: '/video', element: <Video />, name: 'Video', search: true },
  { path: '/video/:id', element: <VideoView />, name: 'VideoView', search: false },
  { path: '/shorts', element: <Shorts />, name: 'Shorts', search: true },
  {
    path: '/message/:id',
    element: (
      <Message>
        <ChatDesktop />
      </Message>
    ),
    name: 'Chat',
    search: false,
  },
  { path: '*', element: <NotFound />, name: 'Not found', search: false },
];
