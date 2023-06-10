export const baseUrl = 'http://localhost:4444';

export const loginUrl = baseUrl + '/auth/login';
export const registerUrl = baseUrl + '/auth/register';
export const meUrl = baseUrl + '/auth/me';
export const posts = baseUrl + '/posts';
export const postById = (id: string) => baseUrl + `/post/${id}`;
export const postsById = (id: string) => baseUrl + `/posts/${id}`;
export const uploadPostImage = baseUrl + '/upload';
export const getPostImage = (id: string) => baseUrl + `/uploads/${id}`;
export const updateProfileData = (id: string) => baseUrl + `/profile/${id}`;
export const usersUrl = baseUrl + '/people';
export const userById = (id: string) => baseUrl + `/people/${id}`;
