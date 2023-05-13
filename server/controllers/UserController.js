import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import userModel from '../models/user.js'

export const register = async (request, response) => {
  try {
    const errors = validationResult(request)
    if (!errors.isEmpty()) return response.status(400).json(errors.array())

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
    const { passwordHash, ...userData } = user._doc
    response.json({
      ...userData,
      token
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      message: 'registration failed'
    })
  }
}

export const login = async (request, response) => {
  try {
    const user = await userModel.findOne({ email: request.body.email })
    if (!user) {
      return response.status(404).json({
        message: 'User not found'
      })
    }

    const isValidPassword = await bcrypt.compare(request.body.password, user._doc.passwordHash)

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
    const { passwordHash, ...userData } = user._doc
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

export const whoAmI = async (request, response) => {
  try {
    const user = await userModel.findById(request.userId)
    if (!user) {
      response.status(404).json({
        message: 'user not found'
      })
    }
    const { passwordHash, ...userData } = user._doc
    response.json(
      userData,
    )

  } catch (err) {
    response.status(500).json({
      message: 'authorization failed'
    })
  }
}
