import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { UserModel } from '../models/user.model'
import { compareHashedString, jwtGenerator } from '../utils/authUtils'
import { IUser } from '../types/user.types'
import { AuthService } from './auth.service'
import { RegisterDTO } from './auth.dto'
import { Controller, Post } from '@overnightjs/core'

const authService: AuthService = new AuthService()

@Controller('/auth')
export class AuthController {
  @Post()
  async register (req: Request, res: Response, next: NextFunction) {
    try {
      const registerDTO: RegisterDTO = plainToClass(RegisterDTO, req.body, {
        excludeExtraneousValues: true
      })

      const user: IUser = await authService.register(registerDTO)
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  }
  @Post()
  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body
      const existUser: IUser | null = await UserModel.findOne({ username })
      if (!existUser)
        throw { status: 401, message: 'the username or password is incorrect' }
      const realUser = compareHashedString(password, existUser.password)
      if (!realUser)
        throw { status: 401, message: 'the username or password is incorrect' }

      await jwtGenerator({ username, id: existUser._id })
      const user = await UserModel.findById(existUser._id, {
        __v: 0,
        password: 0
      })
      return res.json({
        statusCode: 200,
        data: {
          user
        }
      })
    } catch (error) {
      next(error)
    }
  }
}
