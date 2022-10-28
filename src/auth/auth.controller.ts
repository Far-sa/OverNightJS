import { NextFunction, Request, Response } from 'express'
import { plainToClass } from 'class-transformer'

import { IUser } from '../types/user.types'
import { AuthService } from './auth.service'
import { LoginDTO, RegisterDTO } from './auth.dto'
import { Controller, Post } from '@overnightjs/core'

@Controller('auth')
export class AuthController {
  private authService: AuthService = new AuthService()
  @Post('register')
  async register (req: Request, res: Response, next: NextFunction) {
    try {
      const registerDTO: RegisterDTO = plainToClass(RegisterDTO, req.body, {
        excludeExtraneousValues: true
      })

      const user: IUser = await this.authService.register(registerDTO)
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  }
  @Post('login')
  async login (req: Request, res: Response, next: NextFunction) {
    try {
      const loginDTO: LoginDTO = plainToClass(LoginDTO, req.body, {
        excludeExtraneousValues: true
      })

      const user: IUser = await this.authService.login(loginDTO)
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
