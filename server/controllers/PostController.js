import Post from '../models/post.js'

export const remove = async (request, response) => {
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
    response.json({
      success: true
    })
  } catch (err) {
    response.status(500).json({
      message: 'error with deleting posts by id'
    })
  }
}

export const getOne = async (request, response) => {
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

export const getAll = async (request, response) => {
  try {
    const posts = await Post.find().populate('user').exec()
    response.json(posts)
  } catch (err) {
    response.status(500).json({
      message: 'error with fetching posts'
    })
  }
}

export const create = async (request, response) => {
  try {
    const doc = new Post({
      title: request.body.title,
      text: request.body.text,
      imageUrl: request.body.imageUrl,
      tags: request.body.tags,
      user: request.userId
    })
    const post = await doc.save()
    response.json(post)
  } catch (err) {
    response.status(500).json({
      message: 'error with creating post'
    })
  }
}


export const update = async (request, response) => {
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
    response.json({ success: true })
  } catch (err) {
    return response.status(500).json({
      message: 'failed to update post'
    })
  }
}
