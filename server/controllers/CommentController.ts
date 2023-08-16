import { Response } from "express";
import { TypedRequestBody } from "../types/utils/utils.type";
import CommentModel from "../models/comments";
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
            res.json(savedComment)
        }
    }catch(err) {
        res.status(500).json({
            message: 'Failed to add comment'
        })
    }
}