import mongoose from 'mongoose';
import { PostModel } from '../types/models/models.type';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: String,
  viewsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,

})
export default mongoose.model<PostModel>('Post', postSchema)
