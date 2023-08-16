import mongoose from "mongoose";
import { StudioModel } from "../types/models/models.type";

const studioSchema = new mongoose.Schema(
  {
    videoUrl: String,
    videoPreviewUrl: String,
    videoDuration: Number,
    title: String,
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
    comments: {
      commentsLength: {
        type: Number,
        default: 0,
      },
      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      }],
    },
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

studioSchema.pre("save", async function (next) {
  if (this.comments) {
    const currentCommentsLength = this.comments.comments.length;

    if (this.comments.commentsLength !== currentCommentsLength) {
      this.comments.commentsLength = currentCommentsLength;
    }
  }

  next();
});


export default mongoose.model<StudioModel>("Studio", studioSchema);
