import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../types/public.types'

export function ApiErrorHandler (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode: number = error?.status || 500
  const message: string = error?.message || 'Internal Server Error'
  return res.status(statusCode).json({
    statusCode,
    message
  })
}

export function NotFoundErrorHandler (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode: number = 404
  const message: string = 'NotFound'
  return res.status(statusCode).json({
    statusCode,
    message
  })
}
