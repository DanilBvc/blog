import { Dispatch, SetStateAction } from 'react';
import { videoResponse, whoAmIResponseType } from '../../../generallType/generallType';

export type videoViewPanelProps = {
  videoData: videoResponse;
  setVideoData: Dispatch<SetStateAction<videoResponse | null>>;
};
