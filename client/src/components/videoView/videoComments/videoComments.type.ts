import { commentResponse, videoResponse } from '../../../generallType/generallType';

export type videoCommentsProps = {
  videoData: videoResponse;
  setVideoComments: React.Dispatch<React.SetStateAction<commentResponse[] | null>>;
  videoComments: commentResponse[] | null;
  updateCommentReaction: (like: number, dislike: number, commentId: string) => void;
};
