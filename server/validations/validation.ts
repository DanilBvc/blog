import { body } from "express-validator"

export const regiterValidation = [
  body('email', 'bad email format').isEmail(),
  body('password', 'password must be at least 8 characters').isLength({ min: 5 }),
  body('fullName', 'name must be at least 3 characters').isLength({ min: 3 }),
  body('avatarUrl', 'bad image format').isString()
]

export const loginValidation = [
  body('email', 'bad email format').isEmail(),
  body('password', 'password must be at least 8 characters').isLength({ min: 5 }),
]

export const postCreateValidation = [
  body('title', 'please add post title').isLength({ min: 3 }).isString(),
  body('text', 'please add post text').isLength({ min: 10 }).isString(),
  body('tags', 'incorrect tag format').optional().isArray(),
  body('imageUrl', 'please add post image').optional().isString(),
]

export const updateProfileValidation = [
  body('email', 'bad email format').isEmail(),
  body('fullName', 'name must be at least 3 characters').isLength({ min: 3 }),
  body('avatarUrl', 'bad image format').optional().isString()
]
