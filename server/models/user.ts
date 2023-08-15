import mongoose from 'mongoose';
import { UserModel } from '../types/models/models.type';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  friendsList: {
    type: [String],
    default: [],
  },
  friendListRequests: {
    type: [String],
    default: [],
  },
  friendListWaitingRequests: {
    type: [String],
    default: [],
  },
  avatarUrl: {
    type: String,
    required: true
  },
  chats: {
    type: [String]
  }, 
  like: {
    type: [String],
    required: true
  },
  dislike: {
    type: [String],
    required: true
  }
}, {
  timestamps: true,
  usePushEach: true,
  usePullEach: true,
})
export default mongoose.model<UserModel>('User', userSchema)
