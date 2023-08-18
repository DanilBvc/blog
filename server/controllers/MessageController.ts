import { Response } from "express";
import { TypedRequestBody } from "../types/utils/utils.type";
import user from "../models/user";
import { Message } from "../models/message";
import mongoose, { Types } from "mongoose";
import { MessageItem } from "../types/models/models.type";
import { sortOptions } from "../types/request/messageBody/messageBody";
import { io } from "../index";
import { sortFunctions } from "../types/request/requestOptions/requestOptions";

export const getUserMessages = async (
  request: TypedRequestBody<{ userId: string }>,
  response: Response
) => {
  try {
    const userId = request.body.userId;
    const userModel = await user.findOne({ _id: userId });

    if (userModel) {
      const userChatsReq = userModel.chats.map(
        async (chat) => await Message.findOne({ _id: chat })
      );
      const userChats = await Promise.all(userChatsReq);

      const usersReq = userChats.map(async (userChat) => {
        if (userChat?.user === userId) {
          return await user.findOne({ _id: userChat?.admin });
        }
        return await user.findOne({ _id: userChat?.user });
      });

      const users = await Promise.all(usersReq);
      const userObjects = users.map((user) => user?.toObject());
      response.json(userObjects);
    } else {
      response.status(400).json({
        message: "User not found",
      });
    }
  } catch (err) {
    response.status(500).json({
      message: "Failed to load user messages",
    });
  }
};

export const addChat = async (
  request: TypedRequestBody<{ userId: string; chatId: string }>,
  response: Response
) => {
  try {
    const { userId } = request.body;
    const friend = request.params.id;
    console.log(friend);
    const existingChat = await Message.findOne({
      $or: [
        { $and: [{ admin: userId }, { user: friend }] },
        { $and: [{ user: userId }, { admin: friend }] },
      ],
    });
    if (existingChat) {
      response.json(existingChat.id);
    } else {
      const doc = new Message({
        admin: userId,
        user: friend,
        _id: new mongoose.Types.ObjectId(),
        messages: [],
      });
      const chat = await doc.save();

      await user.findByIdAndUpdate(
        userId,
        { $push: { chats: chat.id } },
        { new: true }
      );
      response.json(chat.id);
    }
  } catch (err) {
    response.status(500).json({
      message: "Failed to add new chat",
    });
  }
};

export const searchUsersChat = async (
  request: TypedRequestBody<{ userId: string }>,
  response: Response
) => {
  try {
    const query = request.query.q;
    const sortBy = request.query.s as sortOptions;
    const userId = request.body.userId;
    const users = await user.find({
      $and: [
        { _id: { $ne: userId } },
        { fullName: { $regex: new RegExp(query as string, "i") } },
      ],
    });
    if (sortBy && Object.values(sortOptions).includes(sortBy)) {
      const sortedUsers = users.sort(sortFunctions[sortBy]);
      response.json(sortedUsers);
    } else {
      response.json(users);
    }
  } catch (err) {
    response.status(500).json({
      message: "Failed to search users",
    });
  }
};

export const getChatData = async (
  request: TypedRequestBody<{}>,
  responce: Response
) => {
  try {
    const { id } = request.params;
    const chatData = await Message.findOne({ _id: id });
    responce.json(chatData);
  } catch (err) {
    responce.status(500).json({
      message: "Failed to load chat data",
    });
  }
};

export const sendMessage = async (
  request: TypedRequestBody<{ userId: string } & MessageItem>,
  response: Response
) => {
  try {
    const chatId = request.params.id;
    const {
      messageType,
      message,
      sender,
      files,
      pinned,
      edited,
      forwarded,
      replied,
      userId,
    } = request.body;
    const chat = await Message.findOne({ _id: chatId });
    if (chat) {
      await user.findByIdAndUpdate(chat.user, { $addToSet: { chats: chatId } });
      io.emit("new_message", { id: chatId, sender });

      if (edited) {
        const messageId = new Types.ObjectId(request.body._id);
        const messageToUpdate = chat.messages.find((msg) =>
          msg._id.equals(messageId.toString())
        );
        if (messageToUpdate) {
          if (messageToUpdate.sender === userId) {
            messageToUpdate.message = message;
            messageToUpdate.edited = true;
          }
        }
      } else {
        const messageBody = {
          sender,
          messageType,
          pinned,
          edited,
          date: String(new Date()),
          files,
          forwarded,
          replied,
          message,
          _id: new Types.ObjectId(),
        };
        chat.messages.push(messageBody);
      }

      const updChat = await chat.save();
      response.json(updChat);
    } else {
      response.status(400).json({
        message: "Chat not found",
      });
    }
  } catch (err) {
    response.status(500).json({
      message: "Failed to send message",
    });
  }
};

export const deleteMessage = async (
  req: TypedRequestBody<{ userId: string; messageId: string }>,
  res: Response
) => {
  try {
    const chatId = req.params.id;
    const { userId, messageId } = req.body;
    const chatData = await Message.findOne({ _id: chatId });
    if (chatData) {
      const message = chatData.messages.find(
        (message) => message._id.toString() == messageId
      );
      if (message && message.sender === userId) {
        await Message.updateOne(
          { _id: chatId },
          { $pull: { messages: { _id: messageId } } }
        );
      } else {
        res.status(400).json({
          message: "You cannot delete other people`s messages.",
        });
      }
    } else {
      res.status(404).json({
        message: "Message not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};

export const pinMessage = async (
  request: TypedRequestBody<{ messageId: string; userId: string }>,
  response: Response
) => {
  try {
    const chatId = request.params.id;
    const { messageId } = request.body;
    const chatData = await Message.findOne({ _id: chatId });
    if (chatData) {
      const messageToUpd = chatData.messages.find((message) => {
        return message._id.toString() === messageId;
      });
      if (messageToUpd) {
        messageToUpd.pinned = !messageToUpd.pinned;
        await chatData.save();
        response.json(messageToUpd);
      } else {
        response.status(404).json({
          message: "Message not found",
        });
      }
    } else {
      response.status(404).json({
        message: "Chat not found",
      });
    }
  } catch (err) {
    response.status(500).json({
      message: "Failed to pin message",
    });
  }
};
