// Define models for posts
import mongoose, { Schema } from 'mongoose'
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
    content: String,
    tags: [String],
  },
  {
    timestamps: true, // will add createdAt and updatedAt fields
  },
)

export const Post = mongoose.model('post', postSchema)
