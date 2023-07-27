import mongoose from "mongoose";
import { StudioModel } from "../types/models/models.type";
const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    text: String,
  },
  {
    timestamps: true,
  }
);

const studioSchema = new mongoose.Schema(
  {
    videoUrl: String,
    videoPreviewUrl: String,
    videoDuration: Number,
    description: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<StudioModel>("Studio", studioSchema);
