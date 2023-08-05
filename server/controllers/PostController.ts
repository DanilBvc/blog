import { Response } from 'express'
import Post from '../models/post.js'
import user from '../models/user.js'
import { TypedRequestBody } from '../types/utils/utils.type.js'
import { io } from '../index.js'

export const remove = async (request: TypedRequestBody<{}>, response: Response) => {
  try {
    const postId = request.params.id
    const doc = await Post.findOneAndDelete({
      _id: postId
    })
    if (!doc) {
      return response.status(404).json({
        message: 'post not found'
      })
    }
    io.emit('new_post')
    response.json({
      success: true
    })
  } catch (err) {
    response.status(500).json({
      message: 'error with deleting posts by id'
    })
  }
}

export const getOne = async (request: TypedRequestBody<{}>, response: Response) => {
  try {
    const postId = request.params.id
    const doc = await Post.findOneAndUpdate({
      _id: postId
    }, {
      $inc: {
        viewsCount: 1
      }
    }, {
      new: true
    }).exec()
    if (!doc) {
      return response.status(404).json({
        message: 'post not found'
      })
    }
    response.json(doc)
  } catch (err) {
    response.status(500).json({
      message: 'error with fetching posts by id'
    })
  }
}

export const getAll = async (request: TypedRequestBody<{}>, response: Response) => {
  try {
    const posts = await Post.find().populate('user').exec()

    response.json(posts)
  } catch (err) {
    response.status(500).json({
      message: 'error with fetching posts'
    })
  }
}

export const create = async (request: TypedRequestBody<{ title: string, text: string, imageUrl: string, tags: string[], userId: string }>, response: Response) => {
  const { title, tags, imageUrl, text, userId } = request.body
  try {
    const doc = new Post({
      title: title,
      text: text,
      imageUrl: imageUrl,
      tags: tags,
      user: request.body.userId
    })
    io.emit('new_post')
    const post = await doc.save()
    response.json(post)
  } catch (err) {
    response.status(500).json({
      message: 'error with creating post'
    })
  }
}


export const update = async (request: TypedRequestBody<{ title: string, text: string, imageUrl: string, userId: string, tags: string[] }>, response: Response) => {
  try {
    const postId = request.params.id
    await Post.updateOne({
      _id: postId,

    }, {
      title: request.body.title,
      text: request.body.text,
      imageUrl: request.body.imageUrl,
      user: request.body.userId,
      tags: request.body.tags
    })
    io.emit('new_post')
    response.json({ success: true })
  } catch (err) {
    return response.status(500).json({
      message: 'failed to update post'
    })
  }
}

export const getAllUserPosts = async (request: TypedRequestBody<{}>, response: Response) => {
  try {
    const _id = request.params.id
    const posts = await Post.find({
      user: { $nin: _id }
    })
    const author = await user.findOne({ _id: _id })
    const updatedPosts = posts.map((post) => {
      return { ...post.toObject(), user: author?.toObject() };
    });
    response.json(updatedPosts)
  } catch (err) {
    response.status(500).json({
      message: 'Failed to load user posts'
    })
  }

}
