import { Response, response } from 'express';
import { TypedRequestBody } from '../types/utils/utils.type';
import user from '../models/user';
import { Message } from '../models/message';
import mongoose from 'mongoose';

export const getUserMessages = async (request: TypedRequestBody<{ userId: string }>, response: Response) => {
  try {
    const userId = request.body.userId
    const userModel = await user.findOne({ _id: userId })
    if (userModel) {
      const updatedUserModel = await Promise.all(userModel.chats.map(async (chat) => await Message.findOne({ _id: chat })))
      response.json(updatedUserModel)
    } else {
      response.status(400).json({
        message: 'User not found'
      })
    }
  } catch (err) {
    response.status(500).json({
      message: 'Failed to load user messages'
    })
  }
}
export const addChat = async (request: TypedRequestBody<{ userId: string, chatId: string }>, response: Response) => {
  try {
    const { userId } = request.body
    const friend = request.params.id
    console.log(friend)
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $push: { chats: friend } },
      { new: true }
    );
    const doc = new Message({
      admin: userId,
      users: [friend],
      _id: new mongoose.Types.ObjectId(),
      messages: []
    })
    const chatId = await doc.save()
    console.log(chatId)

    response.json(updatedUser)
  } catch (err) {
    console.log(err)
    response.status(500).json({
      message: 'Failed to add new chat'
    })
  }
}

export const searchUsersChat = async (request: TypedRequestBody<{ userId: string }>, responce: Response) => {
  try {
    const query = request.query.q
    const sortBy = request.query.s
    const userId = request.body.userId
    const users = await user.find({
      $and: [
        { _id: { $ne: userId } },
        { fullName: { $regex: new RegExp(query as string, "i") } }
      ],

    })

    responce.json(users)
  } catch (err) {
    response.status(500).json({
      message: 'Failed to search users'
    })
  }
}
