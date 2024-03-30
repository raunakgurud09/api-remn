import { Request, Response } from 'express'
import { get } from 'lodash'
import { Cloudinary } from '../../lib/cloudinary'
import { Track } from '../tracks/track.model'
import User from '../user/user.model'
import { Playlist } from './playlist.model'

export const getOpenPlaylists = async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.find({})
    res.status(200).json({ data: { playlists },message:"Public playlist" })
  } catch (error) {
    res.status(500).json({ message: 'server error' })
  }
}

export const createPlaylist = async (req: Request, res: Response) => {
  const { name, isPublic } = req.body
  const { userId }: any = get(req, 'user')

  if (!name && !isPublic) {
    return res.status(400).json({ message: 'name and isPublic are required' })
  }

  try {
    const playlist = await Playlist.create({
      name,
      isPublic,
      userId
    })

    res.status(200).json({ data: { playlist }, message: 'Playlist created' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Can't create playlist" })
  }
}

export const uploadPlaylistImage = async (req: Request, res: Response) => {
  const image = get(req, 'file')
  const { playlistId } = req.params
  const { userId }: any = get(req, 'user')

  try {
    const playlist = await Playlist.findOne({ _id: playlistId })

    if (!playlist)
      return res.status(400).json({ message: 'No such playlist exist' })

    if (!image) return res.status(400).json({ message: 'Image is required' })

    const imageUrl = await Cloudinary.upload(image, `/${playlistId}`, {
      width: 600,
      height: 600
    })
    if (!imageUrl)
      return res.status(500).json({ message: 'Image not uploaded ' })

    playlist.imageUrl = imageUrl
    await playlist.save()

    res.status(201).json({ data: { playlist } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Not able to upload' })
  }
}

export const updatePlaylist = async (req: Request, res: Response) => {
  const { playlistId } = req.params
  const { name, isPublic } = req.body
  try {
    const playlist = await Playlist.findOneAndUpdate(
      { _id: playlistId },
      { name, isPublic }
    )
    if (!playlist)
      return res.status(400).json({ message: 'Playlist not found' })

    await playlist.save()
    res.status(200).json({ data: { playlist } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'cant get this playlist' })
  }
}

export const deletePlaylist = async (req: Request, res: Response) => {
  const { playlistId } = req.params
  try {
    const playlist = await Playlist.findOneAndDelete({ _id: playlistId })

    res.status(200).json({ message: 'Playlist deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'cant get this Playlist' })
  }
}

export const getPublicPlaylists = async (req: Request, res: Response) => {
  const { userId } = req.params
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) return res.status(400).json({ message: 'No user found' })

    const playlists = await Playlist.find({ userId })

    // filter playlist to only public
    const publicPlaylist = playlists.filter((playlist) => {
      if (playlist.isPublic === true) return playlist
    })

    res
      .status(200)
      .json({ data: { publicPlaylist }, message: 'All users playlist' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "can't get users playlist" })
  }
}

export const getPrivatePlaylists = async (req: Request, res: Response) => {
  const { playlistId } = req.params
  const { userId }: any = get(req, 'user')
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) return res.status(400).json({ message: 'No user found' })

    const playlist = await Playlist.findOne({ _id: playlistId }).populate('tracks')

    res.status(200).json({ data: { playlist }, message: 'All users playlist' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "can't get users playlist" })
  }
}

export const allUsersPlaylists = async (req: Request, res: Response) => {
  const { userId }: any = get(req, 'user')
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) return res.status(400).json({ message: 'No user found' })

    const playlists = await Playlist.find({ userId: userId })

    res.status(200).json({ data: { playlists }, message: 'All users playlist' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "can't get users playlist" })
  }
}

export const playlistTracks = async (req: Request, res: Response) => {
  const { userId }: any = get(req, 'user')
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) return res.status(400).json({ message: 'No user found' })

    const playlists = await Playlist.find({ userId: userId }).populate('tracks')

    res.status(200).json({ data: { playlists }, message: 'All users playlist' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "can't get users playlist" })
  }
}

export const addPlaylistTracks = async (req: Request, res: Response) => {
  const { playlistId, trackId } = req.params

  try {
    let playlist: any = await Playlist.findOne({ _id: playlistId }).populate('')
    if (!playlist) {
      return res.status(400).json({ message: "Playlist doesn't exist" })
    }
    const track = await Track.findOne({ _id: trackId })

    if (!track) return res.status(400).json({ message: 'No such track found' })

    const isTrackExist = playlist?.tracks.some(
      (track: any) => trackId == track.toString()
    )

    if (isTrackExist) {
      return res
        .status(400)
        .json({ message: 'Track already exist in playlist' })
    } else {
      playlist = await Playlist.findByIdAndUpdate(
        { _id: playlistId },
        { $addToSet: { tracks: trackId } },
        { new: true }
      )
    }

    res
      .status(200)
      .json({ data: { playlist }, message: 'Track added to your list' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Can't update track to playlist" })
  }
}

export const removePlaylistTrack = async (req: Request, res: Response) => {
  const { playlistId, trackId } = req.params
  try {
    const playlist = await Playlist.findOneAndUpdate(
      { _id: playlistId },
      { $pull: { tracks: { _id: trackId } } },
      { new: true }
    ).populate('tracks')

    res
      .status(200)
      .json({ data: { playlist }, message: 'Track deleted from playlist' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Can't update track to playlist" })
  }
}

// console.log(playlist, track)
