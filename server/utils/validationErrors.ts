import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';
import { TypedRequestBody } from '../types/utils/utils.type';

export default (request: TypedRequestBody<{}>, response: Response, next: NextFunction) => {
  const errors = validationResult(request)
  console.log(errors)
  if (!errors.isEmpty()) return response.status(400).json(errors.array())
  next()
}
