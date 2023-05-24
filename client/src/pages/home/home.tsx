import { FC, useEffect } from 'react';
import BaseLayout from '../../layouts/baseLayout/baseLayout';
import CreatePostBlock from '../../components/createPostBlock/createPostBlock';

const Home: FC = () => {
  return (
    <BaseLayout>
      <CreatePostBlock />
    </BaseLayout>
  );
};
export default Home;
