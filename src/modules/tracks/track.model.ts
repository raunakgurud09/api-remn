import { Schema, model, Document, Types } from 'mongoose'
const { String, ObjectId } = Schema.Types

export interface TrackDocument extends Document {
  name: string
  imageUrl: string
  audioUrl: string
  lyrics: string
  artist: string
  userId: string
}

const TrackSchema = new Schema(
  {
    name: { type: String, unique: true },
    imageUrl: { type: String, default: '' },
    audioUrl: { type: String, default: '' },
    lyrics: String,
    artist: String,
    userId: String
  },
  {
    timestamps: true
  }
)

TrackSchema.index(
  {
    name: 'text'
  },
  {
    weights: {
      name: 3
    }
  }
)

export const Track = model<TrackDocument>('Track', TrackSchema)
