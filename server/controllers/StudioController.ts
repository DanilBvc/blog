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
    fileName: string;
    description: string;
    userId: string;
  }>,
  res: Response
) => {
  try {
    const { videoUrl, fileName, description, userId, videoPreviewUrl } =
      req.body;
    let previewFilePath = videoPreviewUrl;
    const fileUrl = videoUrl.substring(videoUrl.lastIndexOf("/") + 1);
    const filePath = path.resolve("./uploads", "studio", fileUrl);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(500).json({
          message: "File does not exist",
        });
      }
    });
    const newFilePath = path.resolve("./uploads", "studio", fileName);
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        res.status(500).json({
          message: "Failed to rename file",
        });
      }
    });
    ffmpeg.ffprobe(newFilePath, (err: Error, metadata: any) => {
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
      const doc = new Studio({
        videoUrl: updVideoUrl,
        description,
        author: userId,
        videoPreviewUrl: previewFilePath,
        videoDuration: duration,
      });
      doc
        .save()
        .then((video) => {
          res.status(200).json(video);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Failed to save video",
          });
        });
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load video",
    });
  }
};

export const getAllMyVideos = async (
  req: TypedRequestBody<{ userId: string }>,
  res: Response
) => {
  try {
    const { userId } = req.body;
    const videos = await Studio.find({ author: userId });
    console.log(videos);
    res.json(videos);
  } catch (err) {
    res.status(500).json({
      message: "Failed to load user video",
    });
  }
};
