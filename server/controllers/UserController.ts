import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../models/user.js'
import { TypedRequestBody } from '../types/utils/utils.type.js'
import { RequestHandler, Response } from 'express'
import { Types } from 'mongoose'
import { UserModel } from '../types/models/models.type.js'
import { io } from '../index.js'
export const register = async (request: TypedRequestBody<{ email: string, fullName: string, avatarUrl: string, password: string }>, response: Response) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(request.body.password, salt)

    const doc = new userModel({
      email: request.body.email,
      fullName: request.body.fullName,
      avatarUrl: request.body.avatarUrl,
      passwordHash: hash,
    })

    const user = await doc.save()

    const token = jwt.sign({
      _id: user._id,
    }, 'secret123', {
      expiresIn: '30d'
    })
    const { passwordHash, ...userData } = user.toObject();
    response.json({
      ...userData,
      token
    })
  } catch (err) {
    response.status(409).json({
      message: 'user with this email already exists'
    })
  }
}

export const login = async (request: TypedRequestBody<{ email: string, password: string, }>, response: Response) => {
  try {
    const user = await userModel.findOne({ email: request.body.email })
    if (!user) {
      return response.status(404).json({
        message: 'User not found'
      })
    }

    const isValidPassword = await bcrypt.compare(request.body.password, user.toObject().passwordHash)

    if (!isValidPassword) {
      return response.status(400).json({
        message: 'Incorrect username or password'
      })
    }

    const token = jwt.sign({
      _id: user._id,
    }, 'secret123', {
      expiresIn: '30d'
    })
    const { passwordHash, ...userData } = user.toObject()
    response.json({
      ...userData,
      token
    })
  } catch (err) {
    response.status(500).json({
      message: 'authorization failed'
    })
  }
}

export const whoAmI = async (request: TypedRequestBody<{ userId: string, }>, response: Response) => {
  try {
    const user = await userModel.findById(request.body.userId)
    if (!user) {
      response.status(404).json({
        message: 'user not found'
      })
    } else {
      const { passwordHash, ...userData } = user.toObject()
      response.json(
        userData,
      )
    }
  } catch (err) {
    response.status(500).json({
      message: 'authorization failed'
    })
  }
}

export const updateUser: RequestHandler<{ id: string }, any, { userId: string, fullName: string, avatarUrl: string, email: string }, {}, Record<string, any>> = async (request, response) => {
  try {
    const { id } = request.params;
    const { fullName, avatarUrl, email } = request.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, { fullName, avatarUrl, email }, { new: true });

    if (!updatedUser) {
      return response.status(404).json({
        message: 'User not found'
      });
    }

    const { passwordHash, ...userData } = updatedUser.toObject();

    response.json(userData);
  } catch (err) {
    response.status(500).json({
      message: 'Failed to update user'
    });
  }
}

export const getAllUsers = async (request: TypedRequestBody<{ userId: string }>, response: Response) => {
  try {
    const _id = request.body.userId
    if (!_id) {
      const users = await userModel.find({
        _id: { $ne: _id },
      }, { passwordHash: 0 });
      response.json(users);
    } else {
      const existingUser = await userModel.findOne({ _id: _id });
      const users = await userModel.find({
        $and: [
          { _id: { $ne: _id } },
          { _id: { $nin: existingUser?.friendsList } },
          { _id: { $nin: existingUser?.friendListWaitingRequests } }
        ]
      }, { passwordHash: 0 });
      console.log(users)

      response.json(users);
    }
  } catch (err) {
    response.status(500).json({
      message: 'Failed to get users'
    })
  }
}

export const addFriend: RequestHandler<{}, any, { userId: string, _id: string, _friendId: string, _option: string }, {}, Record<string, any>> = async (request, response) => {
  try {
    const { _id, _friendId, _option } = request.body;
    const existingUser = await userModel.findOne({ _id: _id });
    const existingFriend = await userModel.findOne({ _id: _friendId });

    let updatedUser;
    if (existingUser && existingFriend) {
      if (_option === 'Decline') {
        (existingUser.friendListWaitingRequests as unknown as Types.DocumentArray<UserModel>).pull(_friendId);
        (existingFriend.friendListRequests as unknown as Types.DocumentArray<UserModel>).pull(_id);

        existingUser.friendsList.push(_friendId);
        existingFriend.friendsList.push(_id);
        updatedUser = await existingUser.save();
        await existingFriend.save();

      } else if (_option === 'Accept') {
        (existingUser.friendListWaitingRequests as unknown as Types.DocumentArray<UserModel>).pull(_friendId);
        (existingFriend.friendListRequests as unknown as Types.DocumentArray<UserModel>).pull(_id);

        existingUser.friendsList.push(_friendId);
        existingFriend.friendsList.push(_id);
        updatedUser = await existingUser.save();
        await existingFriend.save();
        io.emit("friends_accept", { _id, _friendId })
      } else if (existingUser.friendListWaitingRequests.includes(_friendId) && existingFriend.friendListRequests.includes(_id)) {
        (existingUser.friendListWaitingRequests as unknown as Types.DocumentArray<UserModel>).pull(_friendId);
        (existingFriend.friendListRequests as unknown as Types.DocumentArray<UserModel>).pull(_id);
        updatedUser = await existingUser.save();
        await existingFriend.save();
        io.emit("friends_req", { _id })

      } else if (existingUser.friendListRequests.includes(_friendId) && existingFriend.friendListWaitingRequests.includes(_id)) {
        (existingUser.friendListRequests as unknown as Types.DocumentArray<UserModel>).pull(_friendId);
        (existingFriend.friendListWaitingRequests as unknown as Types.DocumentArray<UserModel>).pull(_id);
        updatedUser = await existingUser.save();
        await existingFriend.save();
        io.emit("friends_req", { _id })

      } else {
        updatedUser = await userModel.findByIdAndUpdate(
          _id,
          { $push: { friendListRequests: _friendId } },
          { new: true }
        );
        await userModel.findByIdAndUpdate(
          _friendId,
          { $push: { friendListWaitingRequests: _id } },
          { new: true }
        );
        io.emit("friends_req", { _id })
      }
    } else {
      updatedUser = existingUser;
    }

    response.json(updatedUser);
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: 'Failed to add friend'
    });
  }
}


export const getUserById = async (request: TypedRequestBody<{}>, response: Response) => {
  try {
    const { id } = request.params;
    const user = await userModel.findById(id);
    if (!user) {
      response.status(404).json({
        message: 'User not found'
      });
      return;
    }
    const { passwordHash, ...userData } = user.toObject();
    response.json(userData);
  } catch (err) {
    response.status(500).json({
      message: 'Failed to get user'
    })
  }
}
