import { Cloudinary } from '../lib/cloudinary'

export const convertImageToUrl = async (
  path: string,
  image?: Express.Multer.File | undefined
) => {
  try {
    // send Image to cloudinary
    if (!image) return { message: 'File not uploaded properly' }

    const imageUrl = await Cloudinary.upload(image, path, {
      height: 600,
      width: 600
    })
    if (!imageUrl) return { message: 'image not uploaded' }

    return imageUrl
  } catch (error) {
    console.log(error)
    // throw new error
  }
}
