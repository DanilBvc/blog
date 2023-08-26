import { FC, useState } from 'react';

import './createPostBlock.scss';

import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { getUserFirstAndLastName } from '../../../utils/getUserFirstAndLastName';
import { uploadPostImage, baseUrl, posts } from '../../../utils/network';
import { authorizedRequest } from '../../../utils/queries';
import BrowseFileModal from '../../general/browseFileModal/browseFileModal';
import FormError from '../../general/formError/formError';
import InputArea from '../../general/inputArea/inputArea';
import InputField from '../../general/inputField/inputField';
import Modal from '../../general/modal/modal';
import SubmitButton from '../../general/submitButton/submitButton';
import UserAvatar from '../../general/userAvatar/userAvatar';
import BlockWrapper from '../../general/blockWrapper/blockWrapper';
import addPosts from '../../../store/actions/addPost';

const CreatePostBlock: FC = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayModalImage, setDisplayModalImage] = useState(false);
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userDataReducer);
  const [tagsInput, setTagsInput] = useState('');
  const [postData, setPostData] = useState<{
    title: string;
    text: string;
    tags: string[] | [];
    imageUrl: string;
  }>({
    title: '',
    text: '',
    tags: [],
    imageUrl: '',
  });

  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const submitPost = async () => {
    const postRequest = await authorizedRequest(posts, 'POST', 'token', postData);
    dispatch(addPosts(postRequest));
    setDisplayModal(false);
  };
  const handleModal = () => setDisplayModal(!displayModal);
  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const formData = new FormData();
    formData.append('image', file as File);
    try {
      const { data } = await axios.post(uploadPostImage, formData);
      setPostData({ ...postData, imageUrl: `${baseUrl}${data.url}` });
    } catch (err) {
      setError(true);
      setErrorText('Only .png, .jpg and .jpeg format allowed!');
    }
    setDisplayModalImage(false);
    setDisplayModal(true);
  };
  const onImageDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('image', file as File);
    try {
      const { data } = await axios.post(uploadPostImage, formData);
      setPostData({ ...postData, imageUrl: `${baseUrl}${data.url}` });
    } catch (err) {
      setError(true);
      setErrorText('Only .png, .jpg and .jpeg format allowed!');
    }
    setDisplayModalImage(false);
    setDisplayModal(true);
  };

  return (
    <>
      <Modal closeModal={handleModal} open={displayModal} additionalClass={'post-blcok'}>
        <FormError errorText={errorText} appear={error} />
        <div className="create-post-content">
          <div className="create-post-user">
            <UserAvatar />
            <SubmitButton
              text={'Upload post image'}
              onClick={() => {
                setDisplayModalImage(!displayModalImage);
                setDisplayModal(!displayModal);
              }}
            />
          </div>
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
            value={tagsInput}
            isSearch={false}
            placeholder={'tags'}
            label={null}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTagsInput(e.target.value);
            }}
          />
          {postData.tags.map((tag) => `#${tag} `)}
          <SubmitButton
            text={'add tag'}
            onClick={() => {
              setPostData({ ...postData, tags: [...postData.tags, tagsInput] });
              setTagsInput('');
            }}
          />
          <InputArea
            textHandler={(value: string) => {
              setPostData({ ...postData, text: value });
            }}
            value={postData.text}
            placeholder={'What would you like to talk about?'}
          />
          <SubmitButton
            text={'Send'}
            onClick={() => {
              submitPost();
            }}
          />
        </div>
      </Modal>
      <BrowseFileModal
        inputFileOnChange={onImageChange}
        inputOnDropEvent={onImageDrop}
        closeModal={() => setDisplayModalImage(!displayModalImage)}
        open={displayModalImage}
        inputText={'add post image'}
        multiple={false}
      />
      <BlockWrapper>
        <div className="createPost-avatar">
          <UserAvatar />
          <p>
            What`s new, {userData ? getUserFirstAndLastName(userData.fullName).firstName : 'friend'}
            ?
          </p>
        </div>
        <div className="createPost-button">
          <SubmitButton text={'create post'} onClick={handleModal} />
        </div>
      </BlockWrapper>
    </>
  );
};
export default CreatePostBlock;
