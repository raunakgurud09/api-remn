import { Schema, model, Document, Types } from 'mongoose'
import { TrackDocument } from '../tracks/track.model'
const { String, ObjectId } = Schema.Types

export interface PlaylistDocument extends Document {
  name: string
  isPublic: boolean
  imageUrl: string
  userId: any
  tracks: TrackDocument[]
}

const PlaylistSchema = new Schema(
  {
    name: { type: String },
    isPublic: { type: Boolean, default: true },
    imageUrl: { type: String, default: '' },
    userId: {
      type: ObjectId,
      ref: 'User'
    },
    tracks: [
      {
        type: ObjectId,
        ref: 'Track'
      }
    ]
  },
  {
    timestamps: true
  }
)

export const Playlist = model<PlaylistDocument>('Playlist', PlaylistSchema)
