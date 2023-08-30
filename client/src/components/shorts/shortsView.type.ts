import { videoResponse } from '../../generallType/generallType';

export type shortsViewProps = {
  updateShorts: () => void;
  shorts: videoResponse[];
};
