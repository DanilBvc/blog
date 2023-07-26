import { TypedRequestBody } from "../types/utils/utils.type";
import fs from "fs";
import { Response } from "express";
import Studio from "../models/studio";
import { baseServerUrl } from "..";
import path from "path";
export const changeVideoData = async (
  req: TypedRequestBody<{
    videoUrl: string;
    fileName: string;
    description: string;
    userId: string;
  }>,
  res: Response
) => {
  try {
    const { videoUrl, fileName, description, userId } = req.body;
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
    const updVideoUrl = baseServerUrl + `/uploads/studio/${fileName}`;
    const doc = new Studio({
      videoUrl: updVideoUrl,
      description,
      author: userId,
    });
    const video = await doc.save();
    res.status(200).json(video);
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
