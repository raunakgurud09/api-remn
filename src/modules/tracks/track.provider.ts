import { Cloudinary } from '../../lib/cloudinary'

const uploadAudio = async (
  audio: Express.Multer.File | undefined,
  trackId: string
) => {
  if (!audio) return { message: 'File not uploaded properly' }

  try {
    const audioUrl = await Cloudinary.uploadAudioFile(audio, `/${trackId}`)

    if (!audioUrl) return { message: 'audio not uploaded' }

    return 
  } catch (error) {
    return ''
  }
}

export default {
  uploadAudio
}
