import { Post } from '../db/models/post.js'

export async function createPost({ title, author, content, tags }) {
  const post = new Post({ title, author, content, tags })
  return post.save()
}
