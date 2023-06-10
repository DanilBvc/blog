import mongoose from 'mongoose';

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

const Message = mongoose.model('Message', messageSchema);

const TextMessage = Message.discriminator('TextMessage', textMessageSchema);

const VideoMessage = Message.discriminator('VideoMessage', videoMessageSchema);

const AudioMessage = Message.discriminator('AudioMessage', audioMessageSchema);

export { Message, TextMessage, VideoMessage, AudioMessage };
