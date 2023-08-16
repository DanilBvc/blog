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
      text: String,
    },
    {
      timestamps: true,
    }
  );
  
  commentSchema.add({
    replies: [commentSchema], 
  });

  export default mongoose.model<CommentModel>("Comment", commentSchema);