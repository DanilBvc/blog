import { TypedRequestBody } from '../types/utils/utils.type';
import fs from 'fs';
import { Response } from 'express';
import Studio from '../models/studio';

export const changeVideoData = async (req: TypedRequestBody<{ videoUrl: string, fileName: string, description: string, userId: string }>, res: Response) => {
  const { videoUrl, fileName, description, userId } = req.body;
  const defaultPath = 'D:/visual-project-directory/blog/blog/server';
  const oldPath = defaultPath + videoUrl.substring(videoUrl.indexOf("/uploads"));
  const newPath = defaultPath + '/uploads/studio/' + fileName;

  fs.rename(oldPath, newPath, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error with changing file data'
      });
    } else {
      const doc = new Studio({
        videoUrl: `http://localhost:4444/uploads/studio/${fileName}`,
        description,
        author: userId,
        createdAt: Date.now()
      });
      await doc.save()
      res.json({
        doc
      });
    }
  });
};
