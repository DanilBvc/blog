import { commentResponse } from '../../../../generallType/generallType';

export type videoCommentProps = {
  comment: commentResponse;
  updateCommentReaction: (like: number, dislike: number, commentId: string) => void;
};
