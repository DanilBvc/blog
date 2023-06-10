import { useSearchParams } from 'react-router-dom';
import UserProfileData from '../../components/userProfile/userProfieData/userProfileData';
import UserProfilePosts from '../../components/userProfile/userProfilePosts/userProfilePosts';
import ChatBaseLayout from '../../layouts/chatBaseLayout/chatBaseLayout';
import { useEffect, useState } from 'react';
import { unauthorizedRequest } from '../../utils/queries';
import { userById } from '../../utils/network';
import { whoAmIResponseType } from '../../generallType/generallType';
import ModalError from '../../components/general/modalError/modalError';
import Loading from '../../components/general/loading/loading';

const UserProfile = () => {
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<whoAmIResponseType | null>(null);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userId = searchParams.get('id');
    const getUserData = async () => {
      if (userId) {
        setLoading(true);
        try {
          const response = await unauthorizedRequest(userById(userId), 'GET');
          setUserData(response);
        } catch (err) {
          setError(true);
          setErrorText(String(err));
        }
        setLoading(false);
      }
    };
    getUserData();
  }, [searchParams]);
  return (
    <ChatBaseLayout>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <Loading loading={loading}>
        {userData ? (
          <>
            <UserProfileData userData={userData} />
            <UserProfilePosts userData={userData} />
          </>
        ) : (
          <div>User not found</div>
        )}
      </Loading>
    </ChatBaseLayout>
  );
};
export default UserProfile;
