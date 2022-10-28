import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../types/public.types'
import { validateSync } from 'class-validator'

export function ApiErrorHandler (
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode: number = error?.status || 500
  const message: string = error?.message || 'Internal Server Error'
  return res.status(statusCode).json({
    ...error,
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

export function errorHandler (dto: any) {
  const errors = validateSync(dto)
  let errorsTexts: any[] = []
  for (const errorItem of errors) {
    errorsTexts = errorsTexts.concat(errorItem.constraints)
  }
  if (errorsTexts.length > 0)
    throw { status: 400, message: 'Validation Error', errors: errorsTexts }
  return errorsTexts
}
