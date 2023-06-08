import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { authorizedRequest } from './utils/queries';
import { meUrl } from './utils/network';
import { useAppDispatch, useAppSelector } from './store/hooks/redux';
import setUserData from './store/actions/setUserData';
import { whoAmIResponseType } from './generallType/generallType';

const PrivateRoute = ({ redirectPath = '/login' }) => {
  const userState = useAppSelector((state) => state.userDataReducer);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!userState && token) {
      authorizedRequest(meUrl, 'GET')
        .then((data: whoAmIResponseType) => {
          dispatch(setUserData(data));
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
