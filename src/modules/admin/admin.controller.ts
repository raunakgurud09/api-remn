import { Request, Response } from 'express'
import User from '../user/user.model'

export const getAllUserHandler = async (req: Request, res: Response) => {
  const allUser = await User.find({})
  res.status(200).json(allUser)
}
