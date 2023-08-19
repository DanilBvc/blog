import { Response } from "express";
import { TypedRequestBody } from "../types/utils/utils.type";
import CommentModel from "../models/comments";
import studio from "../models/studio";
import comments from "../models/comments";

const updateCommentsLength = async (videoId: string) => {
    try {
      const video = await studio.findById(videoId);
      if(!video) { 
        return 
      }
      video.$set("comments.commentsLength", video.comments.comments.length)
      await video.save()
    } catch (err) {
      console.error('Error updating commentsLength:', err);
    }
  };

export const createComment = async(req: TypedRequestBody<{userId: string,commentData: string, replied?: string}>, res: Response) => {
    try {
        const {userId, replied, commentData} = req.body
        const videoId = req.params.id;
      
        if(replied) {

        }else {
            const comment = new CommentModel({
                author: userId,
                text: commentData
            })
            const savedComment = await comment.save()
            await studio.findByIdAndUpdate(videoId,
            { $push: { 'comments.comments': savedComment._id } },
            { new: true })
            await updateCommentsLength(videoId)
            res.json(savedComment)
        }
    }catch(err) {
        res.status(500).json({
            message: 'Failed to add comment'
        })
    }
}




export const getVideoComments = async(req: TypedRequestBody<{from: number, to: number}>, res: Response) => {
    try {
        const videoId = req.params.id;
        const from = Number(req.params.from) || 1 
        const to = Number(req.params.to) || 1

        const video = await studio.findById(videoId).populate(
            "comments.comments"
        );
        const comments = video?.comments.comments
        if(!comments) {
            return res.status(404).json({
                message: 'Failed to load comments'
            })
        }
        const fetchComments = comments.slice(0, from).concat(comments.slice(to))
        res.json(fetchComments)

    }catch(err) {
        res.status(500).json({
            message: 'Comments not found'
        })
    }
}