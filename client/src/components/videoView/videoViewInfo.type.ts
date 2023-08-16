import { videoResponse } from '../../generallType/generallType';

export type videoViewInfoProps = {
  videoData: videoResponse | null;
  updateReaction: (like: number, dislike: number) => void;
};
