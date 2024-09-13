import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

export async function createPost(userId, { title, content, tags }) {
  const post = new Post({ title, author: userId, content, tags })
  return post.save()
}

async function listPosts(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return Post.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllPosts(options) {
  return await listPosts({}, options)
}

export async function listPostsByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listPosts({ author: user._id }, options)
}

export async function listPostsByTag(tags, options) {
  return await listPosts({ tags }, options)
}

export async function getPostById(postId) {
  return await Post.findById(postId)
}

export async function updatePost(postId, { title, content, tags }) {
  return await Post.findOneAndUpdate(
    { _id: postId },
    { $set: { title, content, tags } },
    { new: true },
  )
}

export async function deletePost(postId) {
  return await Post.deleteOne({ _id: postId })
}
