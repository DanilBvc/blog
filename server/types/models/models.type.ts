import { Schema } from 'mongoose';

export interface UserModel extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  friendsList: string[];
  friendListRequests: string[];
  friendListWaitingRequests: string[];
  avatarUrl: string;
  chats: string[];
  createdAt: Date
updatedAt: Date
}
export interface MessageItem {
  sender: string,
  messageType: string,
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
  }
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
