import { Router } from 'express'
import authenticate from '../../middleware/authenticate'
import requiresUser from '../../middleware/requiresUser.middleware'
import { uploads } from '../user/user.router'
import {
  allTracks,
  createTrack,
  getMyTracks,
  trackDelete,
  trackDisplay,
  trackUpdate,
  uploadAudio,
  uploadImage
} from './track.controller'

const router = Router()

router.route('/').post(requiresUser, uploads.any(), createTrack).get(allTracks)
router.get('/me', requiresUser, getMyTracks)

router
  .route('/:trackId/audio')
  .post(
    requiresUser,
    authenticate.trackPermission,
    uploads.single('audio'),
    uploadAudio
  )
router
  .route('/:trackId/image')
  .post(
    requiresUser,
    authenticate.trackPermission,
    uploads.single('image'),
    uploadImage
  )

router
  .route('/:trackId')
  .get(requiresUser, trackDisplay)
  .put(requiresUser, authenticate.trackPermission, trackUpdate)
  .delete(requiresUser, authenticate.trackPermission, trackDelete)

export { router as trackRouter }
