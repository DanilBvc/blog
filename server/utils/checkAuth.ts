import { NextFunction, Response } from 'express';
import { TypedRequestBody } from './../types/utils/utils.type';
import jwt, { JwtPayload } from 'jsonwebtoken'
export default (request: TypedRequestBody<{ userId: string }>, response: Response, next: NextFunction) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s?/, '')
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secret123') as JwtPayload
      const userId = decoded._id
      request.body.userId = userId
    } catch (err) {
      response.status(403).json({
        message: 'user is not authorized'
      })
    }
  } else {
    response.status(403).json({
      message: 'user is not authorized'
    })
  }
  next()
}
