import { FC } from 'react';
import SubmitButton from '../general/submitButton/submitButton';
import { useAppSelector } from '../../store/hooks/redux';

const CreatePostBlock: FC = () => {
  const state = useAppSelector((state) => state.userDataReducer);
  return (
    <div className="createPost-wrapper">
      <div className="createPost-avatar">
        <img src={state?.avatarUrl} alt="user-avatar" />
      </div>
      <div className="createPost-button">
        <SubmitButton text={'create post'} />
      </div>
    </div>
  );
};
export default CreatePostBlock;
