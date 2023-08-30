import { FC, useEffect, useState } from 'react';
import BaseLayout from '../../layouts/baseLayout/baseLayout';
import Posts from '../../components/posts/posts/posts';
import { useAppDispatch } from '../../store/hooks/redux';
import setPosts from '../../store/actions/setPosts';
import { unauthorizedRequest } from '../../utils/queries';
import { posts } from '../../utils/network';
import { postData } from '../../generallType/store/initialStateTypes';
import CreatePostBlock from '../../components/posts/createPostBlock/createPostBlock';
import ModalError from '../../components/general/modalError/modalError';
import { socket } from '../../socket';

const Home: FC = () => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.connect();
    const fetchPosts = async () => {
      unauthorizedRequest(posts, 'GET')
        .then((data: postData) => dispatch(setPosts(data)))
        .catch((err) => {
          setError(true);
          setErrorText(err);
        });
    };
    fetchPosts();
    socket.on('new_post', () => {
      fetchPosts();
    });
  }, []);
  return (
    <BaseLayout>
      <ModalError
        open={error}
        close={() => {
          setError(false);
        }}
        text={errorText}
      />
      <CreatePostBlock />
      <Posts />
    </BaseLayout>
  );
};
export default Home;
