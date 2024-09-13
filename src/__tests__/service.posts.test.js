import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'

import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from '../service/posts.js'
import { Post } from '../db/models/post.js'
import { User } from '../db/models/user.js'

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    console.log(createdUser)
    const created = await createPost(createdUser._id, {
      title: 'Hello, world!',
      content: 'This is a test post.',
      tags: ['test'],
    })
    expect(created._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const found = await Post.findById(created._id)
    // the found object should contain all the properties of the created object
    expect(found).toEqual(
      expect.objectContaining({
        title: created.title,
        content: created.content,
        tags: created.tags,
      }),
    )
  })

  test('without title should fail', async () => {
    const post = {
      content: 'This is a test post.',
      tags: ['test'],
    }
    try {
      await createPost(createdUser._id, post)
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.message).toContain('Path `title` is required')
    }
  })
})

const sampleUser = {
  username: 'admin',
  password: 'pass',
}

const samplePosts = [
  {
    title: 'Hello, Express!',
    // author: 'admin',
    content: 'This is a test post.',
    tags: ['express', 'test'],
  },
  {
    title: 'Hello, Mongoose!',
    // author: 'Alice',
    tags: ['mongoose', 'test'],
  },
]

let createdSamplePosts = []
let createdUser = {}
beforeEach(async () => {
  await User.deleteMany({})
  const u = new User(sampleUser)
  await u.save()
  createdUser = u
  await Post.deleteMany({})
  createdSamplePosts = []
  for (const post of samplePosts) {
    post['author'] = u._id
    const p = new Post(post)
    createdSamplePosts.push(await p.save())
  }
})

describe('listing posts', () => {
  test('should return all posts', async () => {
    const posts = await listAllPosts()
    expect(posts).toHaveLength(samplePosts.length)
  })

  test('should return posts sorted by creation date descending', async () => {
    const posts = await listAllPosts()
    const sortedPosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    for (let i = 0; i < posts.length; i++) {
      expect(posts[i]._id).toEqual(sortedPosts[i]._id)
    }
  })

  test('should return posts by author', async () => {
    const posts = await listPostsByAuthor('admin')
    expect(posts).toHaveLength(2)
    expect(posts[0].author).toEqual(createdUser._id)
  })

  test('should return posts by tag', async () => {
    const posts = await listPostsByTag('express')
    expect(posts).toHaveLength(1)
    expect(posts[0].tags).toContain('express')
  })
})

describe('getting a post', () => {
  test('should return a post by ID', async () => {
    const post = await getPostById(createdSamplePosts[0]._id)
    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject())
  })

  test('should return null for non-existent ID', async () => {
    // a 24-character string that is not a valid ObjectId
    const post = await getPostById('000000000000000000000000')
    expect(post).toBeNull()
  })
})

describe('updating a post', () => {
  test('should update title', async () => {
    const updated = await updatePost(createdSamplePosts[0]._id, {
      title: 'Hello, Goodbye',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.title).toBe('Hello, Goodbye')
  })

  test('should update the updatedAt field', async () => {
    const originalUpdatedAt = createdSamplePosts[0].updatedAt
    await updatePost(createdSamplePosts[0]._id, {
      title: 'Hello, Goodbye',
    })
    const updatedPost = await Post.findById(createdSamplePosts[0]._id)
    expect(updatedPost.updatedAt).not.toEqual(originalUpdatedAt)
  })

  test('should fail if the id does not exist', async () => {
    var p
    try {
      p = await updatePost('000000000000000000000000', {
        title: 'Hello, Goodbye',
      })
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.CastError)
    }
    expect(p).toEqual(null)
  })
})

describe('deleting posts', () => {
  test('should delete a post by ID', async () => {
    const postId = createdSamplePosts[0]._id
    await deletePost(postId)
    const post = await Post.findById(postId).lean()
    expect(post).toBeNull()
  })

  test('should return the deleted post', async () => {
    const result = await deletePost('000000000000000000000000')
    expect(result.deletedCount).toEqual(0)
  })
})
