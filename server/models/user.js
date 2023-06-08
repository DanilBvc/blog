import mongoose from 'mongoose';

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
  }
}, {
  timestamps: true,
  usePushEach: true
})
export default mongoose.model('User', userSchema)
