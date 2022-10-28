import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../models/user.model'
import { AuthUtils } from '../utils/authUtils'
import { IUser } from '../types/user.types'
import { isJWT } from 'class-validator'

// to develop a nameSpace in request of Express( add user)
declare global {
  namespace Express {
    export interface Request {
      user?: IUser
    }
  }
}

export async function Authenticated (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token: string | undefined = req?.headers?.authorization?.split(' ')[1]
    if (!token) throw { status: 401, message: 'Please Log in ' }
    if (!isJWT(token)) throw { status: 401, message: 'Invalid Token' }
    const { username, id: _id } = AuthUtils.decodeToken(token as string)
    if (!username || !_id) throw { status: 401, message: 'unauthorized' }
    const user = await UserModel.findOne({ username })
    if (!user) throw { status: 401, message: 'You are not Authorized' }

    //* deep copy of user
    req.user = JSON.parse(JSON.stringify(user))
    next()
  } catch (error) {
    next(error)
  }
}
