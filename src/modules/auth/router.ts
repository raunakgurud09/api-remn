import express from 'express'

const Router = express.Router()

import {
  register,
  login,
  logout,
  // verifyEmail,
  loginViaGoogle
} from './auth.controller'

Router.route('/register').post(register)
Router.route('/login').post(login)
Router.route('/logout').delete(logout)
Router.route('/google').post(loginViaGoogle)

// Router.route('/send-verification-email').post(verifyEmail)

export { Router as authRouter }
