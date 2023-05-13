import { body } from "express-validator"

export const regiterValidation = [
  body('email', 'bad email format').isEmail(),
  body('password', 'password must be at least 8 characters').isLength({ min: 5 }),
  body('fullName', 'name must be at least 3 characters').isLength({ min: 3 }),
  body('avatarUrl', 'bad image format').optional().isURL()
]
