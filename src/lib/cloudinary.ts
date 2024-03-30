import cloudinary from 'cloudinary'
import config from '../configs/index.config'

cloudinary.v2.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
})

export const Cloudinary = {
  uploadAudioFile: async (audio: Express.Multer.File, folder: string) => {
    try {
      if (!audio) return { message: 'File not uploaded properly' }
      const audioUrl = await cloudinary.v2.uploader.upload(audio.path, {
        resource_type: 'video',
        public_id: `audio/${folder}`,
        chunk_size: 6000000,
        eager: [
          { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
          {
            width: 160,
            height: 100,
            crop: 'crop',
            gravity: 'south',
            audio_codec: 'none'
          }
        ],
        eager_async: true,
        eager_notification_url: 'https://mysite.example.com/notify_endpoint'
      })
      console.log(typeof audioUrl.secure_url)
      return audioUrl.secure_url
    } catch (error) {
      console.log(error)
      return
    }
  },
  uploadAudioString: async (audio: string, folder: string) => {
    try {
      if (!audio) return { message: 'File not uploaded properly' }
      const audioUrl = await cloudinary.v2.uploader.upload(audio, {
        resource_type: 'video',
        public_id: `audio/${folder}`,
        chunk_size: 6000000,
        eager: [
          { width: 300, height: 300, crop: 'pad', audio_codec: 'none' },
          {
            width: 160,
            height: 100,
            crop: 'crop',
            gravity: 'south',
            audio_codec: 'none'
          }
        ],
        eager_async: true,
        eager_notification_url: 'https://mysite.example.com/notify_endpoint'
      })
      console.log(typeof audioUrl.secure_url)
      return audioUrl.secure_url
    } catch (error) {
      console.log(error)
      return
    }
  },
  uploadImageFile: async (
    image: string,
    folder: string,
    { width, height }: { width: number; height: number | string }
  ) => {
    try {
      const res = await cloudinary.v2.uploader.upload(image, {
        public_id: `renm/${folder}`,
        transformation: [{ width, height, crop: 'fill' }],
        overwrite: true,
        invalidate: true
      })
      return res.secure_url
    } catch (error) {
      console.log(error)
      return
    }
  },
  upload: async (
    image: Express.Multer.File,
    folder: string,
    { width, height }: { width: number; height: number | string }
  ) => {
    try {
      const res = await cloudinary.v2.uploader.upload(image.path, {
        public_id: `image/${folder}`,
        transformation: [{ width, height, crop: 'fill' }],
        overwrite: true,
        invalidate: true
      })
      return res.secure_url
    } catch (error) {
      console.log(error)
      return
    }
  }
}
