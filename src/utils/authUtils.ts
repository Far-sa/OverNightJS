import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { JwtToken } from '../types/public.types'

export class AuthUtils {
  public static hashPassword (password: string): string {
    const salt: string = genSaltSync(10)
    return hashSync(password, salt)
  }
  public static comparePassword (
    password: string,
    hashedPassword: string
  ): Boolean {
    return compareSync(password, hashedPassword)
  }

  public static tokenGenerator (payload: JwtToken): string {
    const now: number = new Date().getTime()
    const expiryTime: number = now + 1000 * 60 * 60 * 24
    return sign(payload, String(process.env.JWT_ACCESS_TOKEN), {
      expiresIn: expiryTime,
      algorithm: 'HS512'
    })
  }
  public static decodeToken (token: string): JwtToken {
    return verify(token, String(process.env.JWT_ACCESS_TOKEN)) as JwtToken
  }
}
