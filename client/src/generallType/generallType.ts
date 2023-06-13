export type whoAmIResponseType = {
  _id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  friendsList: string[];
  friendListRequests: string[];
  friendListWaitingRequests: string[];
  chats: string[];
  __v?: number;
};
export enum requestOptions {
  ACCEPT = 'Accept',
  DECLINE = 'Decline',
}

export enum sortOptions {
  NEWEST = 'NEWEST',
}
