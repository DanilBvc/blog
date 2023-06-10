import { FC, useEffect, useState } from 'react';
import { whoAmIResponseType } from '../../../generallType/generallType';
import './userProfilePosts.scss';
import { authorizedRequest } from '../../../utils/queries';
import { postsById } from '../../../utils/network';
import ModalError from '../../general/modalError/modalError';
import { postData } from '../../../generallType/store/initialStateTypes';
import Loading from '../../general/loading/loading';
import UserProfilePostsItem from './userProfilePostsItem/userProfilePostsItem';
const UserProfilePosts: FC<{ userData: whoAmIResponseType }> = ({ userData }) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState<postData[] | []>([]);
  useEffect(() => {
    const getPostsData = async () => {
      setLoading(true);
      try {
        const response = await authorizedRequest(postsById(userData._id), 'GET');
        if (response) {
          setUserPosts(response);
        }
      } catch (err) {
        setError(true);
        setErrorText(String(err));
      }
      setLoading(false);
    };
    getPostsData();
  }, [userData]);
  return (
    <>
      <ModalError
        open={error}
        close={() => {
          setError(true);
        }}
        text={errorText}
      />
      <Loading loading={loading}>
        <div className="user-posts-wrapper">
          {userPosts.map((post) => (
            <UserProfilePostsItem post={post} key={post.createdAt + post.title} />
          ))}
        </div>
      </Loading>
    </>
  );
};
export default UserProfilePosts;
