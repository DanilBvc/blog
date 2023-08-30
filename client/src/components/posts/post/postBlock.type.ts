import { whoAmIResponseType } from '../../../generallType/generallType';

export type postBlockProps = {
  author: whoAmIResponseType;
  title: string;
  text: string;
  tags: string[];
  imageUrl: string | null;
};
