import express from 'express'
const Router = express.Router()

import multer from "multer"
const storage = multer.diskStorage({})

import {
  audioUploader,
  getAuthorizedUser,
  getUserProfileHandler,
  uploadAvatarHandler,
  verifyUserHandler
} from './user.controller'

import requiresUser from '../../middleware/requiresUser.middleware'
import authorizePermissions from '../../middleware/auth.middleware'

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('audio')) {
    cb(null, true)
  } else {
    cb('invalid image file!', false)
  }
}

const fileAudioFiler = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('audio')) {
    cb(null, true)
  } else {
    cb('invalid audio file!', false)
  }
}

export const uploads = multer({ storage, fileFilter })
// export const audioUploads = multer({ storage, fileAudioFiler })

Router.route('/profile').get(requiresUser, getUserProfileHandler)

Router.post(
  '/upload-avatar',
  requiresUser,
  uploads.single('image'),
  uploadAvatarHandler
)

Router.route('/audio').post(uploads.single('audio'), audioUploader)
Router.post('/verify-email', requiresUser, verifyUserHandler)

//authorize user only path
Router.get(
  '/authorized',
  requiresUser,
  authorizePermissions('user'),
  getAuthorizedUser
)

export { Router as userRouter }
