import { Response } from "express";
import { TypedRequestBody } from "../types/utils/utils.type";
import CommentModel from "../models/comments";
import studio from "../models/studio";
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
            //savedComment._id save to studio model
            await studio.findByIdAndUpdate(videoId,
            { $push: { 'comments.comments': savedComment._id } },
            { new: true })
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
    }catch(err) {
        res.status(500).json({
            message: 'Comments not found'
        })
    }
}