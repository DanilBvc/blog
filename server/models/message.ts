import mongoose from 'mongoose';
import { MessageModel } from '../types/models/models.type';

const messageSchema = new mongoose.Schema({
  _id: String,
  admin: String,
  users: [String],
  messages: [{
    sender: String,
    messageType: String,
    pinned: Boolean,
    edited: Boolean,
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
    }
  }]

})

const textMessageSchema = new mongoose.Schema({
  message: String,
});

const videoMessageSchema = new mongoose.Schema({
  videoUrl: String,
  videoDuration: Number,
});

const audioMessageSchema = new mongoose.Schema({
  audioUrl: String,
  audioDuration: Number,
});

const Message = mongoose.model<MessageModel>('Message', messageSchema);

const TextMessage = Message.discriminator<MessageModel & { message: string }>('TextMessage', textMessageSchema);

const VideoMessage = Message.discriminator<MessageModel & {
  videoUrl: string,
  videoDuration: number,
}>('VideoMessage', videoMessageSchema);

const AudioMessage = Message.discriminator<MessageModel & {
  audioUrl: string,
  audioDuration: number,
}>('AudioMessage', audioMessageSchema);

export { Message, TextMessage, VideoMessage, AudioMessage };
