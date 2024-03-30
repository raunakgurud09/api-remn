import jwt from 'jsonwebtoken'
import config from '../configs/index.config'

const key = config.privateKey

export async function createTokenUser(user: any) {
  return {
    name: user.name,
    userId: user._id,
    role: user.role,
    email:user.email
  }
}

export async function sign(
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: Object,
  privateKey: string,
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, privateKey, options)
}

export async function decode(token: string) {
  try {
    const decoded = jwt.verify(token, key)
    return { valid: true, expired: false, decoded }
  } catch (error) {
    console.log(error)
    return {
      valid: false,
      expired: 'jwt expired',
      decoded: null
    }
  }
}
