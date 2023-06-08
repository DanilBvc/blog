import { FC, useEffect, useState } from 'react';
import BaseLayout from '../../layouts/baseLayout/baseLayout';
import Posts from '../../components/postsComponent/posts/posts';
import { useAppDispatch } from '../../store/hooks/redux';
import setPosts from '../../store/actions/setPosts';
import { unauthorizedRequest } from '../../utils/queries';
import { posts } from '../../utils/network';
import { postData } from '../../generallType/store/initialStateTypes';
import FormError from '../../components/general/formError/formError';
import CreatePostBlock from '../../components/postsComponent/createPostBlock/createPostBlock';
import ModalError from '../../components/general/modalError/modalError';

const Home: FC = () => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    unauthorizedRequest(posts, 'GET')
      .then((data: postData) => dispatch(setPosts(data)))
      .catch((err) => {
        setError(true);
        setErrorText(err);
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
