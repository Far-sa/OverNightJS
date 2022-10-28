import { ObjectId } from 'mongoose'
import { IUser } from './user.types'

export interface HttpError extends Error {
  status?: number
}

export interface ENV {
  PORT: number | undefined
  MONGO_URI: string | undefined
}
export type ResponseMessage = {
  statusCode: number
  message?: string | undefined
  data?: object | undefined
  errors?: object | undefined
}

export interface jwtGenPayloadDTO {
  id: ObjectId
  username: IUser['username']
}
export type FineDoc<T> = T | null | undefined
