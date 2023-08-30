import { sortOptions } from '../generallType/generallType';

export const baseUrl = 'http://localhost:4444';
export const baseClientUrl = 'http://localhost:3000';
export const loginUrl = baseUrl + '/auth/login';
export const registerUrl = baseUrl + '/auth/register';
export const meUrl = baseUrl + '/auth/me';

export const posts = baseUrl + '/posts';
export const postById = (id: string) => baseUrl + `/post/${id}`;
export const postsById = (id: string) => baseUrl + `/posts/${id}`;
export const getPostImage = (id: string) => baseUrl + `/uploads/${id}`;

export const uploadFiles = (chatId: string) => uploadPostImage + `/files/${chatId}`;
export const uploadPostImage = baseUrl + '/upload';

export const updateProfileData = (id: string) => baseUrl + `/profile/${id}`;
export const usersUrl = baseUrl + '/people';
export const userById = (id: string) => baseUrl + `/people/${id}`;

export const messageUrl = baseUrl + '/message';
export const messageId = (id: string) => baseUrl + `/message/${id}`;
export const messageSearchUrl = (query: string, sortBy = sortOptions.NEWEST) =>
  baseUrl + `/message/search?q=${query}&s=${sortBy}`;
export const deleteMessageUrl = (chatId: string) => baseUrl + `/message/${chatId}`;
export const chatIdUrl = (id: string) => baseUrl + `/chat/${id}`;

export const uploadStudioVideoUrl = baseUrl + `/upload/studio`;
export const uploadStudioPreviewUrl = baseUrl + `/upload/studio/preview`;
export const studioVideoUrl = (page = 1, grid = 10) =>
  baseUrl + `/studio/video?page=${page}&grid=${grid}`;

export const videoByIdUrl = (id: string) => baseUrl + `/studio/video/${id}`;

export const videoCommentUrl = (videoId: string) => baseUrl + `/studio/comment/video/${videoId}`;
export const videoCommentWithQueryUrl = (videoId: string, from: number, to: number) =>
  videoCommentUrl(videoId) + `?from=${from}&to=${to}`;

export const commentUrl = (commentId: string) => baseUrl + `/studio/comment/${commentId}`;
export const commentRepliesUrl = (commentId: string) =>
  baseUrl + `/studio/comment/replies/${commentId}`;

export const commentSortUrl = (videoId: string, sortBy: string) =>
  baseUrl + `/studio/comment/${videoId}?sortBy=${sortBy}`;

export const shortsUrl = (from: number, to: number) => baseUrl + `/shorts?from=${from}&to=${to}`;
export const shortIdUrl = (videoId: string) => baseUrl + `/shorts/${videoId}`;
