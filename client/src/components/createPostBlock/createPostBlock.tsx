import { FC, useState } from 'react';
import SubmitButton from '../general/submitButton/submitButton';
import { useAppSelector } from '../../store/hooks/redux';
import UserAvatar from '../general/userAvatar/userAvatar';
import './createPostBlock.scss';
import Modal from '../general/modal/modal';
import InputArea from '../general/inputArea/inputArea';
import InputField from '../general/inputField/inputField';
import BrowseFileModal from '../general/browseFileModal/browseFileModal';
const CreatePostBlock: FC = () => {
  // const state = useAppSelector((state) => state.userDataReducer);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayModalImage, setDisplayModalImage] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    text: '',
    tags: '',
    imageUrl: '',
  });
  const handleModal = () => setDisplayModal(!displayModal);
  return (
    <>
      <Modal closeModal={handleModal} open={displayModal} additionalClass={''}>
        <InputField
          type={'text'}
          name={'title'}
          value={postData.title}
          isSearch={false}
          placeholder={'title'}
          label={null}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />
        <InputField
          type={'text'}
          name={'tags'}
          value={postData.tags}
          isSearch={false}
          placeholder={'tags'}
          label={null}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPostData({ ...postData, tags: e.target.value });
          }}
        />
        <InputArea
          textHandler={(value: string) => {
            setPostData({ ...postData, text: value });
          }}
          value={postData.text}
          placeholder={'What would you like to talk about?'}
        />
        {/* <BrowseFileModal
          inputFileOnChange={ },
        inputOnDropEvent={ },
        closeModal={() => setDisplayModalImage(!displayModalImage)},
        open={displayModalImage},
        inputText={'add post image'},
        multiple={false}/> */}
      </Modal>
      <div className="createPost-wrapper">
        <UserAvatar />
        <div className="createPost-button">
          <SubmitButton text={'create post'} onClick={handleModal} />
        </div>
      </div>
    </>
  );
};
export default CreatePostBlock;
