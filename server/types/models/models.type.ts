import { Schema, Types } from 'mongoose';

export interface UserModel extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  friendsList: string[];
  friendListRequests: string[];
  friendListWaitingRequests: string[];
  avatarUrl: string;
  chats: string[];
  like: string[];
  dislike: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface MessageItem {
  sender: string,
  messageType: string,
  _id: Types.ObjectId,
  pinned: boolean,
  edited: boolean,
  date: string,
  forwarded: {
    from: string | null,
    message: string | null,
  },
  replied: {
    toMessageId: string | null,
    message: string | null,
  },
  files: string[] | null,
  message: string
}
export interface MessageModel extends Document {
  admin: string,
  user: string,
  messages: MessageItem[]
}

export interface PostModel extends Document {
  title: string,
  text: string,
  tags: string[],
  user: {
    type: Schema.Types.ObjectId | UserModel,
    ref: 'User'
  },
  imageUrl: string,
  viewsCount: 0
}

export interface StudioModel extends Document {
  videoUrl: string,
  description: string,
  viewsCount: number,
  author: {
    type: Schema.Types.ObjectId | UserModel,
    ref: 'User'
  },
  comments: {
    commentsLength: number,
    comments: string[]
  },
  like: number,
  dislike: number,
  createdAt: Date,
  updatedAt: Date,
  title: string,
}

export interface CommentModel {
  author: string,
  like: number,
  dislike: number,
  text: string
  replies: string[],
  avatarUrl: string,
  userName: string,
createdAt: Date,
updatedAt: Date,

}

