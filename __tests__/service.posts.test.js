import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'

import { createPost } from '../service/posts.js'
import { Post } from '../db/models/post.js'

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const created = await createPost({
      title: 'Hello, world!',
      author: 'admin',
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
      author: 'admin',
      content: 'This is a test post.',
      tags: ['test'],
    }
    try {
      await createPost(post)
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(error.message).toContain('Path `title` is required')
    }
  })
})
