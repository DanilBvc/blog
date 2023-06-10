import mongoose from 'mongoose';
import { MessageModel } from '../types/models/models.type';

const messageSchema = new mongoose.Schema({
  messages: [{
    sender: String,
    messageType: String,
    pinned: Boolean,
    edited: Boolean,
    forwarded: {
      from: String,
      message: String,
      default: null
    },
    replied: {
      toMessageId: String,
      message: String,
      default: null
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
