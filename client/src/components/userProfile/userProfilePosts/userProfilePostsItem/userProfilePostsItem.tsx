import { FC, useState } from 'react';
import './userProfilePostsItem.scss';
import Modal from '../../../general/modal/modal';
import { postData } from '../../../../generallType/store/initialStateTypes';
import ProfilePicture from '../../../general/profilePicture/profilePicture';
import SubmitButton from '../../../general/submitButton/submitButton';
import { followStatus } from '../../../../utils/getFollowStatus';
import { useAppSelector } from '../../../../store/hooks/redux';
import { whoAmIResponseType } from '../../../../generallType/generallType';
import ThreeDots from '../../../general/threeDots/threeDots';
const UserProfilePostsItem: FC<{ post: postData }> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const ownerData = useAppSelector((state) => state.userDataReducer);
  const { imageUrl } = post;

  return (
    <>
      <Modal closeModal={() => setOpen(!open)} open={open} additionalClass={''}>
        <div className="user-profile-modal">
          <div className="user-profile-image">
            <img src={imageUrl} alt="post-image" />
          </div>
          <div className="user-profile-wrapper">
            <div className="user-profile-data">
              <ProfilePicture userId={post.user._id} userAvatar={post.user.avatarUrl} />
              <span>{post.user.fullName}</span>
              {ownerData ? <SubmitButton text={followStatus(ownerData, post.user)} /> : null}
              <ThreeDots>
                <div></div>
              </ThreeDots>
            </div>
          </div>
        </div>
      </Modal>
      <div
        className="user-profile-posts-item"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src={imageUrl} className="post-image" alt="post-image" />
      </div>
    </>
  );
};
export default UserProfilePostsItem;
