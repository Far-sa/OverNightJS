import { UserModel } from '../models/user.model'
import { AuthUtils } from '../utils/authUtils'
import { LoginDTO, RegisterDTO } from './auth.dto'
import { IUser } from '../types/user.types'
import { errorHandler } from '../utils/ApiErrorHandler'

export class AuthService {
  async register (userDTO: RegisterDTO): Promise<IUser> {
    errorHandler(userDTO)
    const checkUser = await UserModel.findOne({ username: userDTO.username })
    if (checkUser) throw { status: 400, message: 'Username already used' }
    const newPass = AuthUtils.hashPassword(userDTO.password)
    userDTO.password = newPass

    const user: IUser = await UserModel.create(userDTO)
    return user
  }
  async login (userDTO: LoginDTO): Promise<IUser> {
    errorHandler(userDTO)
    const existUser: IUser | null = await UserModel.findOne({
      username: userDTO.username
    })
    if (!existUser)
      throw { status: 401, message: 'the username or password is incorrect' }
    const realUser = AuthUtils.comparePassword(
      userDTO.password,
      existUser.password
    )
    if (!realUser)
      throw { status: 401, message: 'the username or password is incorrect' }

    const token = AuthUtils.tokenGenerator({
      username: userDTO.username,
      id: existUser._id
    })
    existUser.accessToken = token
    await existUser.save()
    return existUser
  }
}
