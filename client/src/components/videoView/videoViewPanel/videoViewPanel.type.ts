import { videoResponse, whoAmIResponseType } from '../../../generallType/generallType';

export type videoViewPanelProps = {
  videoData: videoResponse;
  updateReaction: (like: number, dislike: number) => void;
};
