import { NextFunction, Request, Response } from 'express'
import { get } from 'lodash'
import { Playlist } from '../modules/playlist/playlist.model'
import { Track } from '../modules/tracks/track.model'

const trackPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = get(req, 'user')

  const { trackId } = req.params

  try {
    const track = await Track.findOne({ _id: trackId }).populate('')

    if (!track) {
      return res.status(404).json({ message: 'Page not found' })
    }
    // if (track.userId._id !== user.userId) {
    //   return res
    //     .status(401)
    //     .json({ message: 'Unauthorized to access others track' })
    // }
    if (track.userId !== user.userId) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access others track' })
    }
    return next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error' })
  }
}

const playlistPermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = get(req, 'user')
  const { playlistId } = req.params

  try {
    const playlist = await Playlist.findOne({ _id: playlistId }).populate('userId')

    if (!playlist) {
      return res.status(404).json({ message: 'playlist not found' })
    }
    
    if (playlist.userId._id.toString() !== user.userId) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access others playlist' })
    }
    return next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error ' })
  }
}

export default {
  trackPermission,
  playlistPermission
}
