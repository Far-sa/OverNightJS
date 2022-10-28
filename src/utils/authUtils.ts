import { compareSync, genSaltSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { UserModel } from '../models/user.model'
import { jwtGenPayloadDTO } from '../types/public.types'

const ACCESS_TOKEN = String(process.env.JWT_ACCESS_TOKEN)

export function HashString (data: string): string {
  const salt: string = genSaltSync(10)
  const hashedString: string = hashSync(data, salt)
  return hashedString
}

export function compareHashedString (data: string, encrypted: string): Boolean {
  return compareSync(data, encrypted)
}

export async function jwtGenerator (payload: jwtGenPayloadDTO): Promise<void> {
  const { id } = payload
  const user = await UserModel.findById(id)
  if (!user) throw { status: 404, message: 'User not found' }
  const expiresIn = new Date().getTime() + 1000 * 60 * 60 * 24

  sign(
    payload,
    ACCESS_TOKEN,
    { expiresIn, algorithm: 'HS512' },
    async (error, token) => {
      if (!error && token) {
        user.accessToken = token
        await user.save()
        //console.log('User is:', user)
      }
    }
  )
}
