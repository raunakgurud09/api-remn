import { Schema } from 'mongoose'

export interface TUser {
  // userId: typeof Schema.Types.ObjectId
  userId: string
  name: string
  role: string
  iat: number
}
