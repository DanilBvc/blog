import mongoose from "mongoose";
import { CommentModel } from "../types/models/models.type";

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
      avatarUrl: {
        type: String,
        require: true,
      },
      userName: {
        type: String,
        require: true
      },
      replies: {
        type: [String],
        require: true
      },
      text: String,
    },
    {
      timestamps: true,
    }
  );
  
 

  export default mongoose.model<CommentModel>("Comment", commentSchema);