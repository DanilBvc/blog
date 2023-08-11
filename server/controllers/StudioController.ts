import { TypedRequestBody } from "../types/utils/utils.type";
import fs from "fs";
import { Response } from "express";
import Studio from "../models/studio";
import { baseServerUrl, io } from "..";
import ffmpeg from "fluent-ffmpeg";
import path from "path";

Studio.watch().on("change", (change) => {
  io.emit("studio_upt", change);
});

export const changeVideoData = async (
  req: TypedRequestBody<{
    videoUrl: string;
    videoPreviewUrl?: string;
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
    } = req.body;
    let previewFilePath = videoPreviewUrl;
    const fileUrl = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
    const filePath = path.resolve("./uploads", "studio", fileUrl);
    const newFilePath = path.resolve("./uploads", "studio", fileName);
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

      const updVideoUrl = baseServerUrl + `/uploads/studio/${fileName}`;

      if (videoId) {
        const updatedVideo = await Studio.findOneAndUpdate(
          { _id: videoId, author: userId },
          {
            videoUrl: updVideoUrl,
            description,
            videoPreviewUrl: previewFilePath,
            videoDuration: duration,
          },
          { new: true }
        );

        if (updatedVideo) {
          res.status(200).json(updatedVideo);
        } else {
          res.status(404).json({
            message: "Video not found or you do not have permission to update.",
          });
        }
      } else {
        const doc = new Studio({
          videoUrl: updVideoUrl,
          description,
          author: userId,
          videoPreviewUrl: previewFilePath,
          videoDuration: duration,
        });

        const newVideo = await doc.save();

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
      const data = await Studio.findById(videoId)
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