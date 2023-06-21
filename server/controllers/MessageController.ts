import { Response, response } from 'express';
import { TypedRequestBody } from '../types/utils/utils.type';
import user from '../models/user';
import { Message } from '../models/message';
import mongoose from 'mongoose';
import { MessageItem } from '../types/models/models.type';
import { SendMessagePayload, messageTypes, sendMessageTypes, sortOptions } from '../types/request/messageBody/messageBody';
import { io } from '../index';
import { sortFunctions } from '../types/request/requestOptions/requestOptions';

export const getUserMessages = async (request: TypedRequestBody<{ userId: string }>, response: Response) => {
  try {
    const userId = request.body.userId;
    const userModel = await user.findOne({ _id: userId });

    if (userModel) {
      const userChatsReq = userModel.chats.map(async (chat) => await Message.findOne({ _id: chat }));
      const userChats = await Promise.all(userChatsReq);

      const usersReq = userChats.map(async (userChat) => {
        if (userChat?.user === userId) {
          return await user.findOne({ _id: userChat?.admin });
        }
        return await user.findOne({ _id: userChat?.user });
      });

      const users = await Promise.all(usersReq);
      const userObjects = users.map(user => user?.toObject());
      response.json(userObjects);
    } else {
      response.status(400).json({
        message: 'User not found'
      });
    }
  } catch (err) {
    response.status(500).json({
      message: 'Failed to load user messages'
    });
  }
}

export const addChat = async (request: TypedRequestBody<{ userId: string, chatId: string }>, response: Response) => {

  try {
    const { userId } = request.body
    const friend = request.params.id
    console.log(friend)
    const existingChat = await Message.findOne({
      $or: [
        { $and: [{ admin: userId }, { user: friend }] },
        { $and: [{ user: userId }, { admin: friend }] }
      ]
    });
    if (existingChat) {
      response.json(existingChat.id)
    } else {
      const doc = new Message({
        admin: userId,
        user: friend,
        _id: new mongoose.Types.ObjectId(),
        messages: []
      })
      const chat = await doc.save()

      await user.findByIdAndUpdate(
        userId,
        { $push: { chats: chat.id } },
        { new: true }
      );
      response.json(chat.id)

    }

  } catch (err) {
    response.status(500).json({
      message: 'Failed to add new chat'
    })
  }
}

export const searchUsersChat = async (request: TypedRequestBody<{ userId: string }>, responce: Response) => {
  try {
    const query = request.query.q
    const sortBy = request.query.s as sortOptions
    const userId = request.body.userId
    const users = await user.find({
      $and: [
        { _id: { $ne: userId } },
        { fullName: { $regex: new RegExp(query as string, "i") } }
      ],

    })
    if (sortBy && Object.values(sortOptions).includes(sortBy)) {
      const sortedUsers = users.sort(sortFunctions[sortBy]);
      responce.json(sortedUsers);
    } else {
      responce.json(users);
    }
  } catch (err) {
    response.status(500).json({
      message: 'Failed to search users'
    })
  }
}

export const getChatData = async (request: TypedRequestBody<{}>, responce: Response) => {
  try {
    const { id } = request.params
    const chatData = await Message.findOne({ _id: id })
    responce.json(chatData)
  } catch (err) {
    responce.status(500).json({
      message: 'Failed to load chat data'
    })
  }
}

export const sendMessage = async (request: TypedRequestBody<{ userId: string } & messageTypes>, response: Response) => {
  try {
    const chatId = request.params.id
    const { messageType, message, sender, files } = request.body
    const chat = await Message.findOne({ _id: chatId })
    if (chat) {
      await user.findByIdAndUpdate(
        chat.user,
        { $addToSet: { chats: chatId } }
      );
      io.emit('new_message', {id: chatId, sender})
      if (messageType === sendMessageTypes.TEXT_MESSAGE) {
        console.log(message)
        const messageBody: SendMessagePayload[sendMessageTypes.TEXT_MESSAGE] & SendMessagePayload[sendMessageTypes.REFERENCES_MESSAGE] & SendMessagePayload[sendMessageTypes.MODIFIED_MESSAGE] & { date: string } = {
          sender,
          messageType,
          pinned: false,
          edited: false,
          date: String(new Date()),
          files,
          forwarded: {
            from: null,
            message: null
          },
          replied: {
            toMessageId: null,
            message: null
          },
          message
        }
        chat.messages.push(messageBody)
        const updChat = await chat.save()
        response.json(updChat)
      }
    } else {
      response.status(400).json({
        message: 'Chat not found'
      })
    }
  } catch (err) {
    console.log(err)
    response.status(500).json({
      message: 'Failed to send message'
    })
  }
}
