// "use strict";
import express from 'express'
import connectDB from './utils/connectDB'
import deserializeUser from './middleware/deserializeUser.middleware'
import config from './configs/index.config'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import status from "express-status-monitor"

const app = express()
app.use(cors({ origin: '*' }))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(deserializeUser)

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(status())
// Database

// Routes
import { authRouter } from './modules/auth/router'
import { userRouter } from './modules/user/user.router'
import { adminRouter } from './modules/admin/admin.router'
import { trackRouter } from './modules/tracks/track.router'
import { playlistRouter } from './modules/playlist/playlist.router'

app.get('/', (req, res) => res.send('working'))
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/track', trackRouter)
app.use('/api/v1/playlist', playlistRouter)

const PORT = config.port as number

app.listen(PORT, async () => {
  await connectDB()
  console.log(`server is running on ${PORT}...`)
})
