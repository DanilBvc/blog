import { whoAmIResponseType } from '../generallType';

//posts types
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

//studio types
export type studioCommentData = {
  commentsLength: number;
  comments: {
    author: whoAmIResponseType;
    like: number;
    dislike: number;
    text: string;
    createdAt: string;
  };
};
export type studioData = {
  _id: string;
  author: string;
  videoUrl: string;
  videoDuration: number;
  description: string;
  videoPreviewUrl: string;
  user: whoAmIResponseType;
  viewsCount: number;
  like: number;
  dislike: number;
  createdAt: string;
  updatedAt: string;
  comments: studioCommentData;
};
