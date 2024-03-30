// import { Schema } from 'mongoose'
import User, { UserDocument } from '../user/user.model'
// import dayjs from 'dayjs'

// export const getUser = (user: UserDocument) => user.hidePassword()

export const createUser = ({
  name,
  email,
  password,
  role
}: {
  name: string
  email: string
  password: string
  role: string
}) => new User({ name, email, password, role })

// export const setResetPasswordToken = (
//   user: UserDocument,
//   resetTokenValue: string,
//   expiryDate: Date
// ) => {
//   // user.passwordResetToken = resetTokenValue
//   // user.passwordResetExpires = expiryDate
// }

export const findUserBy = async (prop: string, value: string) => {
  const user = await User.findOne({ [prop]: value })
  return user
}

// export const findUserById = async (id: typeof Schema.Types.ObjectId) =>
//   await User.findById(id)

export const comparePassword = async (
  user: UserDocument,
  password: string
): Promise<boolean> => {
  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    return false
  }
  return true
}

export const saveUser = async (user: UserDocument) => await user.save()

// // export const setUserPassword = async (user: UserDocument, password: string) => {
// //   user.password = password
// //   user.passwordResetToken = ''
// //   user.passwordResetExpires = dayjs().toDate()
// //   return await user.hashPassword()
// // }

// export const setUserVerified = async (user: UserDocument) => {
//   // user.isVerified = true
//   // user.expires = undefined
// }

// export const deleteUserById = async (user: UserDocument) =>
//   await User.findByIdAndDelete(user._id)

// export const deleteUnverifiedUserByEmail = async (email: string) =>
//   await User.findOneAndDelete({ email, isVerified: false })

export default {
  // getUser,
  createUser,
  comparePassword,
  // setResetPasswordToken,
  findUserBy,
  // findUserById,
  saveUser
  // setUserPassword,
  // setUserVerified,
  // deleteUserById,
  // deleteUnverifiedUserByEmail
}
