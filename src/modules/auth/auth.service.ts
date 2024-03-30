import { createHash } from '../../utils/createHash'
import { createTokenUser, sign } from '../../utils/jwt.utils'
import Users from './auth.provider'
import config from '../../configs/index.config'

export const create = async ({ name, email, password, role }: any) => {
  // Create user
  const emailAlreadyExists = await Users.findUserBy('email', email)

  if (emailAlreadyExists) {
    return { message: 'Email already exist' }
  }

  //pre userSchema to change password

  try {
    const user = await Users.createUser({
      name,
      email,
      password,
      role
    })
    await Users.saveUser(user)
    // send verification email

    return user
  } catch (error) {
    return { message: 'Error in creating user' }
  }
}

export const login = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const user = await Users.findUserBy('email', email)

  if (!user) {
    return { message: 'Email not found' }
  }

  const isMatch = await Users.comparePassword(user, password)

  if (!isMatch) {
    return { message: 'Wrong password' }
  }

  const tokenUser = await createTokenUser(user)
  const accessToken = await sign(tokenUser, config.privateKey)

  return { accessToken, message: 'Login successful' }
}

export default {
  create,
  login
}
