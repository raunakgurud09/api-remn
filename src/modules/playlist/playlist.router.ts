import { Router } from 'express'
import authenticate from '../../middleware/authenticate'
import requiresUser from '../../middleware/requiresUser.middleware'
import { uploads } from '../user/user.router'
import {
  addPlaylistTracks,
  allUsersPlaylists,
  createPlaylist,
  deletePlaylist,
  getOpenPlaylists,
  getPrivatePlaylists,
  getPublicPlaylists,
  playlistTracks,
  removePlaylistTrack,
  updatePlaylist,
  uploadPlaylistImage
} from './playlist.controller'
const router = Router()

router.get('/', getOpenPlaylists)
router.use(requiresUser)

router.post('/', createPlaylist)

// get all public , private
router.get('/:userId/public', getPublicPlaylists)

// #
router.get('/me', allUsersPlaylists)

router
  .route('/:playlistId')
  .post(
    authenticate.playlistPermission,
    uploads.single('image'),
    uploadPlaylistImage
  )
  .put(authenticate.playlistPermission, updatePlaylist)
  .delete(authenticate.playlistPermission, deletePlaylist)
  .get(authenticate.playlistPermission, getPrivatePlaylists)

//tracks add remove get in playlist
router
  .route('/:playlistId/:trackId')
  .get(authenticate.playlistPermission, playlistTracks)
  .post(authenticate.playlistPermission, addPlaylistTracks)
  .delete(authenticate.playlistPermission, removePlaylistTrack) // not working

export { router as playlistRouter }
