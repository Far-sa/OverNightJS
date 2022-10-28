import { UserModel } from '../models/user.model'
import { HashString } from '../utils/authUtils'
import { RegisterDTO } from './auth.dto'
import { IUser } from '../types/user.types'
import { validateSync } from 'class-validator'
import { errorHandler } from '../utils/ApiErrorHandler'

export class AuthService {
  async register (userDTO: RegisterDTO): Promise<IUser> {
    const errors = validateSync(userDTO)
    const validationErr = errorHandler(errors)
    if (validationErr.length > 0)
      throw {
        status: 400,
        message: 'Validation Errors',
        errors: validationErr
      }
    const checkUser = await UserModel.findOne({ username: userDTO.username })
    if (checkUser) throw { status: 400, message: 'Username already used' }
    const newPass = HashString(userDTO.password)
    userDTO.password = newPass

    const user: IUser = await UserModel.create(userDTO)
    return user
  }
}
