import { Cloudinary } from '../../lib/cloudinary'
import Users from './user.provider'

//This user is an token user

const profile = async (user: any) => {
  const { userId } = user
  const foundUser = await Users.findUserById(userId)
  if (!foundUser) return { message: 'User not found' }
  return { foundUser, message: 'User found' }
}

const uploadAvatar = async (
  user: any,
  image: string
) => {
  if (!image) return { message: 'File not uploaded properly' }

  const imageUrl = await Cloudinary.uploadImageFile(image, 'avatar', {
    height: 600,
    width: 600
  })
  if (!imageUrl) return { message: 'Avatar not uploaded' }

  const { userId } = user
  const result = await Users.changeUserImage(userId, imageUrl)

  return result
}

export default {
  profile,
  uploadAvatar
}
