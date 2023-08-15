import { Dispatch, SetStateAction } from 'react';
import { videoResponse } from '../../generallType/generallType';

export type videoViewInfoProps = {
  videoData: videoResponse | null;
  setVideoData: Dispatch<SetStateAction<videoResponse | null>>;
};
