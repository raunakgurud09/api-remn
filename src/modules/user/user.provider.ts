import { Schema } from 'mongoose'
import User, { UserDocument } from './user.model'

export const findUserBy = async (prop: string, value: string) => {
  const user = await User.findOne({ [prop]: value })
  return user
}

export const findUserById = async (id: typeof Schema.Types.ObjectId) => {
  const user = await User.findById(id)
  return user
}

export const changeUserImage = async (
  id: typeof Schema.Types.ObjectId,
  imageUrl: string
) => {
  const user = await User.findById(id)
  if (!user) return { message: 'user not found' }

  user.image = imageUrl
  await saveUser(user)

  return { message: 'Image added to user' }
}

export const saveUser = async (user: UserDocument) => await user.save()

export default {
  findUserBy,
  findUserById,
  changeUserImage
}
