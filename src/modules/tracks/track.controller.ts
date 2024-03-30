import { Request, Response } from 'express'
import { conformsTo, get } from 'lodash'
import { Cloudinary } from '../../lib/cloudinary'
import { Track, TrackDocument } from './track.model'

export const createTrack = async (req: Request, res: Response) => {
  const { name, lyrics, artist } = req.body
  const { userId }: any = get(req, 'user')

  if (!name && !artist) {
    return res.status(400).json({ message: 'name and artist name required' })
  }

  try {
    const findTrack = await Track.findOne({ name })

    if (findTrack)
      return res.status(400).json({ message: 'This track name already exist' })

    const track = await Track.create({
      name,
      lyrics,
      artist,
      userId
    })

    res.status(200).json({ data: { track } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error in creating track' })
  }
}

export const allTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await Track.find({})
    res.status(200).json({ data: { tracks, count: tracks.length } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Cant get tracks' })
  }
}

export const getMyTracks = async (req: Request, res: Response) => {
  const { userId }: any = get(req, 'user')
  try {
    const tracks = await Track.find({ userId })

    res
      .status(200)
      .json({
        data: { tracks, count: tracks.length },
        message: 'All users track'
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Cant get tracks' })
  }
}

export const trackDisplay = async (req: Request, res: Response) => {
  const { trackId } = req.params
  try {
    const track = await Track.findOne({ _id: trackId }).populate('')
    res.status(200).json({ data: { track } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'cant get this track' })
  }
}

export const trackUpdate = async (req: Request, res: Response) => {
  const { trackId } = req.params
  const { name, lyrics, artist } = req.body
  try {
    const isUnique = await Track.findOne({name})

    if(isUnique){
      return res.status(400).json({message:"same track name is not allowed"})
    }

    const track = await Track.findOneAndUpdate(
      { _id: trackId },
      { name, lyrics, artist }
    )
    res.status(200).json({ data: { track } })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'cant get this track' })
  }
}

export const trackDelete = async (req: Request, res: Response) => {
  const { trackId } = req.params
  try {
    const track = await Track.findOneAndDelete({ _id: trackId })
    res.status(200).json({ message: 'Track deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'cant get this track' })
  }
}

export const uploadAudio = async (req: Request, res: Response) => {
  // const audio = get(req, 'file')
  console.log('audio uploader')
  const { audio } = req.body
  const { trackId } = req.params

  try {
    const track: any = await Track.findOne({ _id: trackId })

    if (!track) return res.status(400).json({ message: "Track doesn't exist" })

    if (!audio) return res.status(400).json({ message: 'Audio is required' })

    const audioUrl = await Cloudinary.uploadAudioString(audio, `/${trackId}`)
    if (!audioUrl) return { message: 'audio not uploaded' }

    track.audioUrl = audioUrl
    await track.save()

    res.status(201).json({ data: { track }, message: 'Audio url added' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'cant get this track' })
  }
}

export const uploadImage = async (req: Request, res: Response) => {
  console.log("image uploader")
  // const image = get(req, 'file')
  const { image } = req.body
  const { trackId } = req.params
  try {
    const track: any = await Track.findOne({ _id: trackId })

    if (!track) return res.status(400).json({ message: "Track doesn't exist" })

    if (!image) return res.status(400).json({ message: 'Image is required' })

    const imageUrl = await Cloudinary.uploadImageFile(image, `/${trackId}`, {
      width: 600,
      height: 600
    })
    if (!imageUrl)
      return res.status(500).json({ message: 'Image not uploaded ' })

    track.imageUrl = imageUrl
    await track.save()

    res.status(201).json({ data: { track }, message: 'Image url added' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'cant get this track' })
  }
}
