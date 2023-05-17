import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { authorizedRequest } from './utils/queries';
import { meUrl } from './utils/network';
import { useAppDispatch, useAppSelector } from './store/hooks/redux';
import setUserData from './store/actions/setUserData';

const PrivateRoute = ({ redirectPath = '/login' }) => {
  const userState = useAppSelector((state) => state.userDataReducer);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!userState && token) {
      authorizedRequest(meUrl, 'GET')
        .then((data) => {
          const userData = {
            _id: data._id,
            fullName: data.fullName,
            email: data.email,
            avatarUrl: data.avatarUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
          dispatch(setUserData(userData));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
export default PrivateRoute;
