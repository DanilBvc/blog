import { validationResult } from 'express-validator';

export default (request, response, next) => {
  const errors = validationResult(request)
  console.log(errors)
  if (!errors.isEmpty()) return response.status(400).json(errors.array())
  next()
}
