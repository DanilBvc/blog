import mongoose from 'mongoose';
import { MessageModel } from '../types/models/models.type';

const messageSchema = new mongoose.Schema({
  _id: String,
  admin: String,
  user: String,
  date: String,
  messages: [{
    sender: String,
    messageType: String,
    pinned: Boolean,
    edited: Boolean,
    message: String,
    date: String,
    files: {
      type: [String],
      default: null
    },
    forwarded: {
      from: {
        type: String,
        default: null
      },
      message: {
        type: String,
        default: null
      }
    },
    replied: {
      toMessageId: {
        type: String,
        default: null
      },
      message: {
        type: String,
        default: null
      }
    },
  }]

})


export const Message = mongoose.model<MessageModel>('Message', messageSchema);
