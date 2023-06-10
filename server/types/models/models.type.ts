import { Schema } from 'mongoose';

export interface UserModel extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  friendsList: string[];
  friendListRequests: string[];
  friendListWaitingRequests: string[];
  avatarUrl: string;
}
interface MessageItem {
  sender: string,
  messageType: string,
  pinned: boolean,
  edited: boolean,
  forwarded: {
    from: string,
    message: string,
  } | null,
  replied: {
    toMessageId: string,
    message: string,
  } | null
}
export interface MessageModel extends Document {
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
