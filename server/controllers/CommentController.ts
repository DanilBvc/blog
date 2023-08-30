import { Response } from "express";
import { TypedRequestBody } from "../types/utils/utils.type";
import CommentModel from "../models/comments";
import studio from "../models/studio";
import comments from "../models/comments";
import user from "../models/user";
import { ObjectId } from 'mongodb'; 

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

export const createComment = async(req: TypedRequestBody<{userId: string, commentData: string, avatarUrl: string, userName:string, replied?: string}>, res: Response) => {
    try {
        const {userId, replied, commentData, avatarUrl, userName} = req.body
        const videoId = req.params.id;
      
        if(replied) {
          const comment = new CommentModel({
            author: userId,
            text: commentData,
            avatarUrl,
            userName
          })
          const savedComment = await comment.save()
          await comments.findByIdAndUpdate(replied, {
            $push: { replies:  savedComment._id} 
          })
          res.json(savedComment)
        }else {
            const comment = new CommentModel({
                author: userId,
                text: commentData,
                avatarUrl,
                userName
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

export const updateCommentReaction = async(req: TypedRequestBody<{userId: string, like: boolean, dislike: boolean}>, res: Response) => {
    try {
        const commentId = req.params.id
        const {userId, dislike, like} = req.body
        const userUpdateQuery: any = {};
        const videoUpdateQuery: any = {}
        const userData = await user.findOne({_id: userId}) 
        if(!userData) {
          return res.status(404).json({
            message: "User not found",
          });
        }
    
        if(userData.like.includes(commentId) && dislike) {
          videoUpdateQuery.$inc = { like: -1, dislike: 1 };
    
          userUpdateQuery.$pull = {like: commentId}
          userUpdateQuery.$push = {dislike: commentId}
        }else if(userData.dislike.includes(commentId) && like) {
          videoUpdateQuery.$inc = { dislike: -1, like: 1 };
    
          userUpdateQuery.$pull = {dislike: commentId}
          userUpdateQuery.$push = {like: commentId}
        }else if(userData.like.includes(commentId) && like) {
          videoUpdateQuery.$inc = { like: -1 };
          userUpdateQuery.$pull = {like: commentId}
    
        }else if(userData.dislike.includes(commentId) && dislike) {
          videoUpdateQuery.$inc = { dislike: -1 };
    
          userUpdateQuery.$pull = {dislike: commentId}
        }else if(like) {
          videoUpdateQuery.$inc = { like: 1 };
    
          userUpdateQuery.$push = {like: commentId}
        }else if(dislike) {
          videoUpdateQuery.$inc = { dislike: 1 };
    
          userUpdateQuery.$push = {dislike: commentId}
        }
    
    
        const updatedUser = await user.findOneAndUpdate(
          { _id: userId },
          userUpdateQuery,
          { new: true }
        );
        const updatedVideo = await comments.findOneAndUpdate(
          {_id: commentId},
          videoUpdateQuery,
          {new: true}
        )
        if (!updatedVideo) {
          return res.status(400).json({
            message: "Comment not found",
          });
        }
       res.json({like: updatedVideo.like, dislike: updatedVideo.dislike, updUserData: updatedUser});
    }catch(err) {
        res.status(500).json({
            message: 'Failed to update comment'
        })
    }
}

export const getAllReplies = async(req: TypedRequestBody<{}>, res: Response) => {
  try {
    const commentId = req.params.id;
    const comment = await comments.findOne({_id: commentId})
    if(!comment) {
      return res.json({
        message: 'Comment not found'
      })
    }
    const replyIds = comment.replies;
    const replyPromises = replyIds.map(replyId => comments.findOne({ _id: replyId }));
    const repliesArray = await Promise.all(replyPromises);
   
    res.json(repliesArray);
  }catch(err) {
    res.status(500).json(
      {message: 'Failed to fetch comments'}
    )
  }
} 


export const getSortedComments = async(req: TypedRequestBody<{}>, res: Response) => {
  try {
    const sortBy = req.query.sortBy
    const videoId = req.params.id
    const video = await studio.findOne({_id: videoId})
    if(!video) {
      return res.status(404).json({
        message: 'Video not found'
      })
    }
    const promiseArray = video.comments.comments.map((comment) => comments.findOne({_id: comment}))
    const commentsArray = await Promise.all(promiseArray)
    
    switch (sortBy) {
      case 'newest': {
       const sortedComments = commentsArray.sort((a,b) => {
        if(a && b) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0
       })
       return res.json(sortedComments)
      }
      case 'oldest': {
       const sortedComments = commentsArray.sort((a,b) => {
        if(a && b) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0 
      })
       return res.json(sortedComments)
      }
  
      default:
        return res.json(video);
    }
  }catch(err) {
    res.status(500).json({
      message: 'Failed to sort comments'
    })
  }
}