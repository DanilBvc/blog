import { commentResponse, videoResponse } from '../../generallType/generallType';

export type videoViewInfoProps = {
  videoData: videoResponse | null;
  updateReaction: (like: number, dislike: number) => void;
  setVideoComments: React.Dispatch<React.SetStateAction<commentResponse[] | null>>;
  videoComments: commentResponse[] | null;
  updateCommentReaction: (like: number, dislike: number, commentId: string) => void;
};
