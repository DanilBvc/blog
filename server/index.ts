import { TypedRequestBody } from "./types/utils/utils.type";
import express, { Response } from "express";
import fs from "fs";
import mongoose from "mongoose";
import {
  loginValidation,
  postCreateValidation,
  regiterValidation,
  updateProfileValidation,
} from "./validations/validation.js";
import cors from "cors";
import { validationErrors, checkAuth } from "./utils/index.js";
import multer from "multer";
import {
  PostControllers,
  UserControllers,
  MessageControllers,
  StudioControllers,
  CommentControllers,
} from "./controllers/index.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
export const baseServerUrl = "http://localhost:4444";
export const baseClientUrl = "http://localhost:3000";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_API_KEY as string)
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => console.log(`err ${err}`));
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (request, response) => {
  console.log("test");
});

const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: baseClientUrl,
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Set();

io.on("connection", (socket) => {
  socket.on("join_online", (userId) => {
    console.log(`user: ${userId} connected`);
    socket.join("online");
    onlineUsers.add(userId);
  });

  socket.on("get_online", () => {
    socket.emit("online", Array.from(onlineUsers));
  });

  socket.on("disconnect", (userId) => {
    onlineUsers.delete(userId);
  });
});

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const filesStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const chatId = req.params.id;
    const destination = `uploads/files/${chatId}`;
    try {
      const stat = await fs.promises.stat(destination);
      if (!stat.isDirectory()) {
        throw new Error(`${destination} is not a directory`);
      }
    } catch (err) {
      await fs.promises.mkdir(destination, { recursive: true });
    }
    cb(null, destination);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const videoFilesStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destination = `uploads/studio/`;
    try {
      const stat = await fs.promises.stat(destination);
      if (!stat.isDirectory()) {
        throw new Error(`${destination} is not a directory`);
      }
    } catch (err) {
      await fs.promises.mkdir(destination, { recursive: true });
    }
    cb(null, destination);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname.replace(/[\s#]/g, ""));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return (req as any).statusCode(501);
    }
  },
});

const uploadFiles = multer({
  storage: filesStorage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    const allowedFormats = [
      "application/pdf",
      "application/msword",
      "text/plain",
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "video/mp4",
      "video/mpeg",
      "video/webm",
      "application/octet-stream",
    ];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});



const uploadVideoFiles = multer({
  storage: videoFilesStorage,
  fileFilter: (req, file, cb) => {
    const allowedFormats = [
      "video/mp4",
      "video/mpeg",
      "video/webm",
      "application/octet-stream",
      "webm",
    ];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

const uploadImageFiles = multer({
  storage: videoFilesStorage,
  fileFilter: (req, file, cb) => {
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg"];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

app.post(
  "/auth/login",
  loginValidation,
  validationErrors,
  UserControllers.login
);
app.post(
  "/auth/register",
  regiterValidation,
  validationErrors,
  UserControllers.register
);
app.get("/auth/me", checkAuth, UserControllers.whoAmI);
app.patch(
  "/profile/:id",
  checkAuth,
  updateProfileValidation,
  validationErrors,
  UserControllers.updateUser
);

app.get("/people", checkAuth, validationErrors, UserControllers.getAllUsers);
app.post("/people", checkAuth, validationErrors, UserControllers.addFriend);
app.get("/people/:id", UserControllers.getUserById);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req?.file?.originalname}`,
  });
});

app.post(
  "/upload/files/:id",
  uploadFiles.single("file"),
  (req: TypedRequestBody<{}>, res) => {
    const chatId = req.params.id;
    try {
      res.json({
        url: `/uploads/files/${chatId}/${req.file?.originalname}`,
      });
    } catch (err) {
      res.status(500).json({
        message: "Failed to upload files, try later",
      });
    }
  }
);
app.post(
  "/upload/studio",
  uploadVideoFiles.single("file"),
  (req: TypedRequestBody<{}>, res) => {
    res.json({
      url: `/uploads/studio/${req?.file?.originalname}`,
    });
  }
);
app.post(
  "/upload/studio/preview",
  uploadImageFiles.single("image"),
  (req: TypedRequestBody<{}>, res) => {
    res.json({
      url: `/uploads/studio/${req?.file?.originalname}`,
    });
  }
);
app.get("/studio/video", checkAuth, StudioControllers.getAllMyVideos);
app.get("/studio/video/:id", StudioControllers.getVideo)
app.post("/studio/video/:id", checkAuth, StudioControllers.updateVideoReaction)
app.delete("/studio/video/:id", checkAuth, StudioControllers.deleteVideo)
app.patch("/upload/studio", checkAuth, StudioControllers.changeVideoData);

app.post("/studio/comment/video/:id", checkAuth, CommentControllers.createComment)
app.post("/studio/comment/:id", checkAuth, CommentControllers.updateCommentReaction)
app.get("/studio/comment/:id", checkAuth, CommentControllers.getSortedComments)
app.get("/studio/comment/video/:id", CommentControllers.getVideoComments)
app.get("/studio/comment/replies/:id", CommentControllers.getAllReplies)
app.delete(
  "/uploads/files/:id/:fileName",
  checkAuth,
  (req: TypedRequestBody<{}>, res: Response) => {
    const chatId = req.params.id;
    const fileName = req.params.fileName;
    fs.unlink(`uploads/files/${chatId}/${fileName}`, (err) => {
      if (err) {
        console.error(`Error with removing file ${fileName}:`, err);
        res.status(500).json({
          message: "Error occurred while removing the file.",
        });
      } else {
        console.log(`File ${fileName} has been successfully removed.`);
        res.status(200).json({
          message: "success",
        });
      }
    });
  }
);

app.get("/shorts", StudioControllers.getAllVideos)
app.get("/shorts/:id", StudioControllers.getAuthorData)

app.use("/uploads", express.static("uploads"));
app.use("/uploads/files/:id", express.static("uploads/files"));
app.use("/uploads/studio/:id", express.static("uploads/studio"));
app.get("/message", checkAuth, MessageControllers.getUserMessages);
app.get("/message/search", checkAuth, MessageControllers.searchUsersChat);
app.get("/message/:id", checkAuth, MessageControllers.addChat);
app.patch("/message/:id", checkAuth, MessageControllers.pinMessage);
app.post("/message/:id", checkAuth, MessageControllers.sendMessage);
app.delete("/message/:id", checkAuth, MessageControllers.deleteMessage);
app.get("/chat/:id", checkAuth, MessageControllers.getChatData);

app.get("/posts", PostControllers.getAll);
app.get("/post/:id", PostControllers.getOne);
app.get(
  "/posts/:id",
  checkAuth,
  validationErrors,
  PostControllers.getAllUserPosts
);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  validationErrors,
  PostControllers.create
);
app.delete("/posts/:id", checkAuth, PostControllers.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  validationErrors,
  PostControllers.update
);

server
  .listen(4444, () => {
    console.log("Server is running");
  })
  .on("error", (err: Error) => {
    console.log("Error starting server:", err);
  });
