import { TypedRequestBody } from "../types/utils/utils.type";
import fs from "fs";
import { Response } from "express";
import Studio from "../models/studio";
import { baseServerUrl, io } from "..";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import user from "../models/user";

Studio.watch().on("change", (change) => {
  io.emit("studio_upt", change);
});

export const changeVideoData = async (
  req: TypedRequestBody<{
    videoUrl: string;
    videoPreviewUrl?: string;
    fileNameWithoutExtension: string;
    videoId?: string;
    fileName: string;
    description: string;
    userId: string;
  }>,
  res: Response
) => {
  try {
    const {
      videoUrl,
      fileName,
      description,
      userId,
      videoPreviewUrl,
      videoId,
      fileNameWithoutExtension
    } = req.body;

    let previewFilePath = videoPreviewUrl;
    const fileUrl = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
    const filePath = path.resolve("./uploads", "studio", fileUrl.replace(/[\s#]/g, ""));
    const newFilePath = path.resolve("./uploads", "studio", fileName.replace(/[\s#]/g, ""));
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        res.status(500).json({
          message: "Failed to rename file",
        });
      }
    });
    ffmpeg.ffprobe(newFilePath, async (err: Error, metadata: any) => {
      if (err) {
        res.status(500).json({
          message: "Failed to parse video",
        });
      }
      const duration = metadata.format.duration;

      if (!previewFilePath) {
        const previewImageName = `${fileName}_preview.png`;
        const previewImagePath = path.resolve("./uploads", "studio");
        ffmpeg(newFilePath).screenshots({
          count: 1,
          filename: previewImageName,
          folder: previewImagePath,
        });
        previewFilePath = `${baseServerUrl}/uploads/studio/${previewImageName}`;
      }

      const updVideoUrl = baseServerUrl + `/uploads/studio/${fileName.replace(/[\s#]/g, "")}`;

      if (videoId) {
        const updatedVideo = await Studio.findOneAndUpdate(
          { _id: videoId, author: userId },
          {
            videoUrl: updVideoUrl,
            description,
            videoPreviewUrl: previewFilePath,
            videoDuration: duration,
            title: fileNameWithoutExtension,
          },
          { new: true }
        );

        if (updatedVideo) {
          io.emit('video_upd', updatedVideo)
          res.status(200).json(updatedVideo);
        } else {
          res.status(404).json({
            message: "Video not found or you do not have permission to update.",
          });
        }
      } else {
        const doc = new Studio({
          videoUrl: updVideoUrl,
          title: fileNameWithoutExtension,
          description,
          author: userId,
          videoPreviewUrl: previewFilePath,
          videoDuration: duration,
        });

        const newVideo = await doc.save();
        io.emit('new_video', newVideo)
        res.status(200).json(newVideo);
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load video",
    });
  }
};

export const getAllMyVideos = async (
  req: TypedRequestBody<{ userId: string; page: number; perPage: number }>,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const { userId } = req.body;

    const totalVideos = await Studio.countDocuments({ author: userId });

    const skip = page - 1;
    const limit = perPage;
    const videos = await Studio.find({ author: userId })
      .skip(skip)
      .limit(limit);
    res.json({ videos, totalVideos });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load user video",
    });
  }
};


export const getVideo = async( req: TypedRequestBody<{  }>, res: Response) => {
    try {
      const videoId = req.params.id;
      const data = await Studio.findByIdAndUpdate(videoId,
        { $inc: { viewsCount: 1 } },
      { new: true }) 
      if(!data) {
        res.status(400).json({
          message: "Video not found"
        })
      }
      res.json(data)
    }catch(err) {
      res.status(500).json({
        message: "Failed to load video"
      })
    }
}

export const updateVideoReaction = async(req: TypedRequestBody<{userId: string, like: boolean, dislike: boolean}>, res: Response) => {
  try {
    const { like, dislike } = req.body;
    const videoId = req.params.id;
    const userId = req.body.userId
    const userUpdateQuery: any = {};
    const videoUpdateQuery: any = {}
    const userData = await user.findOne({_id: userId}) 
    if(!userData) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if(userData.like.includes(videoId) && dislike) {
      videoUpdateQuery.$inc = { like: -1, dislike: 1 };

      userUpdateQuery.$pull = {like: videoId}
      userUpdateQuery.$push = {dislike: videoId}
    }else if(userData.dislike.includes(videoId) && like) {
      videoUpdateQuery.$inc = { dislike: -1, like: 1 };

      userUpdateQuery.$pull = {dislike: videoId}
      userUpdateQuery.$push = {like: videoId}
    }else if(userData.like.includes(videoId) && like) {
      videoUpdateQuery.$inc = { like: -1 };
      userUpdateQuery.$pull = {like: videoId}

    }else if(userData.dislike.includes(videoId) && dislike) {
      videoUpdateQuery.$inc = { dislike: -1 };

      userUpdateQuery.$pull = {dislike: videoId}
    }else if(like) {
      videoUpdateQuery.$inc = { like: 1 };

      userUpdateQuery.$push = {like: videoId}
    }else if(dislike) {
      videoUpdateQuery.$inc = { dislike: 1 };

      userUpdateQuery.$push = {dislike: videoId}
    }


    const updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      userUpdateQuery,
      { new: true }
    );
    const updatedVideo = await Studio.findOneAndUpdate(
      {_id: videoId},
      videoUpdateQuery,
      {new: true}
    )
    if (!updatedVideo) {
      return res.status(400).json({
        message: "Video not found",
      });
    }
   res.json({like: updatedVideo.like, dislike: updatedVideo.dislike});
  }catch(err) {
    res.status(500).json({
      message: 'Failed to react to the video'
    })
  }
} 

export const deleteVideo = async(req: TypedRequestBody<{userId: string}>, res: Response) => {
  try {
    const {userId} = req.body
    const videoId = req.params.id
    
    const video = await Studio.findOne({_id: videoId})
    if(!video) {
      return res.status(404).json({
        message: 'Video not found'
      })
    }
    if(String(video.author) !== userId ) {
      return res.status(400).json({
        message: 'You can not delete videos that are not yours '
      })
    }
    await video.deleteOne()
    io.emit('delete_video', videoId)
    res.status(200).json({
      message: 'Video deleted successfully'
    })
  }catch(err) {
    res.status(500).json({
      message: "Failed to delete video"
    })
  }
}

//shorts endpoints

export const getAllVideos = async(req: TypedRequestBody<{}>, res: Response) => {
  try {
    const from = parseInt(req.params.from)
    const to = parseInt(req.params.to)

    const videos = await Studio.find().skip(from).limit(to - from + 1);

    res.status(200).json(videos);
  }catch(err) {
    res.status(500).json({
      message: 'Failed to load videos'
    })
  }
}

export const getAuthorData = async(req: TypedRequestBody<{}>, res:Response) => {
  try {
    const videoId = req.params.id
    const video = await Studio.findOne({_id: videoId})
    const author = await user.findOne({_id: video?.author})
    if(!author) {
      return res.status(404).json({
        message: 'User not found'
      })
    } 
    const {fullName, avatarUrl} = author
    res.json({fullName, avatarUrl})
  }catch(err) {
    res.status(500).json({
      message: 'Failed to fetch video data'
    })
  }
}