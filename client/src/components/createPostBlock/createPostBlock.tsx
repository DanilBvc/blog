import { FC } from 'react';
import SubmitButton from '../general/submitButton/submitButton';

const CreatePostBlock: FC = () => {
  return (
    <div className="createPost-wrapper">
      <div className="createPost-avatar"></div>
      <div className="createPost-button">
        <SubmitButton text={'create post'} />
      </div>
    </div>
  );
};
export default CreatePostBlock;
