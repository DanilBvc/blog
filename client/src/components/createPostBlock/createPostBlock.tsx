import { FC, useState } from 'react';
import SubmitButton from '../general/submitButton/submitButton';
import UserAvatar from '../general/userAvatar/userAvatar';
import './createPostBlock.scss';
import Modal from '../general/modal/modal';
import InputArea from '../general/inputArea/inputArea';
import InputField from '../general/inputField/inputField';
import BrowseFileModal from '../general/browseFileModal/browseFileModal';
import { authorizedRequest } from '../../utils/queries';
import { baseUrl, posts, uploadPostImage } from '../../utils/network';
import axios from 'axios';
import FormError from '../general/formError/formError';
import { useAppDispatch } from '../../store/hooks/redux';
const CreatePostBlock: FC = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayModalImage, setDisplayModalImage] = useState(false);
  const dispatch = useAppDispatch();
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
      <Modal closeModal={handleModal} open={displayModal} additionalClass={''}>
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
