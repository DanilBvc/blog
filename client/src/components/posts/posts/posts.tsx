import { useAppSelector } from '../../../store/hooks/redux';
import PostBlock from '../post/postBlock';
import './posts.scss';
const Posts = () => {
  const postsData = useAppSelector((state) => state.postsDataReducer);

  return (
    <div className="posts-wrapper">
      {postsData.map((post) => (
        <PostBlock
          key={post.text + post.createdAt}
          author={post.user}
          title={post.title}
          text={post.text}
          tags={post.tags}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};
export default Posts;
