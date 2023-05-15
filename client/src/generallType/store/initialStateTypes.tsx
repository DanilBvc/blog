import { whoAmIResponseType } from '../generallType';

export type postsStateType = postData[] | [];
export type postData = {
  title: string;
  text: string;
  tags: string[];
  user: whoAmIResponseType;
  viewsCount: number;
  createdAt: Date;
  updateAt: Date;
  imageUrl: string;
};
