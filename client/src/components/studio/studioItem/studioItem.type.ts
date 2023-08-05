import { studioData } from '../../../generallType/store/initialStateTypes';

export type studioItemProps = {
  video: studioData;
  checkBoxEvent: (_id: string) => void;
  checkBoxes: string[] | [];
};
