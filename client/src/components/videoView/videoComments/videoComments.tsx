import React, { FC, useState } from 'react';
import './videoComments.scss';
import { videoCommentsProps } from './videoComments.type';
import DropDownMenu from '../../general/dropDownMenu/dropDownMenu';
import { useAppSelector } from '../../../store/hooks/redux';
import { authorizedRequest } from '../../../utils/queries';
import { commentSortUrl, videoCommentUrl } from '../../../utils/network';
import ModalError from '../../general/modalError/modalError';
import VideoCommentInput from './videoCommentInput/videoCommentInput';
import Loading from '../../general/loading/loading';
import VideoComment from './videoComment/videoComment';
const VideoComments: FC<videoCommentsProps> = ({
  videoData,
  setVideoComments,
  videoComments,
  updateCommentReaction,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const currentUser = useAppSelector((state) => state.userDataReducer);
  const { comments, _id } = videoData;

  const sortComments = async (option: string) => {
    setLoading(true);
    try {
      if (sortedBy !== option) {
        const sortedComments = await authorizedRequest(commentSortUrl(_id, option), 'GET');
        setVideoComments(sortedComments);
        setSortedBy(option);
      }
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
    setLoading(false);
  };

  const addComment = async () => {
    try {
      const comment = await authorizedRequest(videoCommentUrl(videoData._id), 'POST', 'token', {
        commentData: inputValue,
        avatarUrl: currentUser?.avatarUrl,
        userName: currentUser?.fullName,
      });
      if (videoComments) {
        setVideoComments([...videoComments, comment]);
      } else {
        setVideoComments([comment]);
      }
      setInputValue('');
    } catch (err) {
      setError(true);
      setErrorText(String(err));
    }
  };

  return (
    <>
      <ModalError open={error} close={() => setError(false)} text={errorText} />
      {currentUser ? (
        <div className="video-comments-wrapper">
          <div className="video-comments-statistic">
            <div className="statistic-counter">{comments.commentsLength} comments</div>
            <div className="statistic-sort">
              <DropDownMenu
                menuData={{
                  name: `Sort by ${sortedBy}`,
                  subitems: [
                    {
                      name: 'oldest',
                      onClick: () => {
                        sortComments('oldest');
                      },
                    },
                    {
                      name: 'newest',
                      onClick: () => {
                        sortComments('newest');
                      },
                    },
                  ],
                }}
              />
            </div>
          </div>
          <VideoCommentInput
            display={true}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onClick={addComment}
          />
          <div className="video-comments">
            <Loading loading={loading}>
              {videoComments?.map((comment) => (
                <VideoComment
                  comment={comment}
                  key={comment._id}
                  updateCommentReaction={updateCommentReaction}
                />
              ))}
            </Loading>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default VideoComments;
