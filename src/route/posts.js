import { requireAuth } from '../middleware/jwt.js'
import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../service/posts.js'

export function postsRoutes(app) {
  // Add the following route handlers
  // curl http://localhost:3000/api/v1/posts
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }
    try {
      if (author && tag) {
        return res.status(400).json({
          error: 'query parameters author and tag cannot be used together',
        })
      } else if (author) {
        const posts = await listPostsByAuthor(author, options)
        return res.json(posts)
      } else if (tag) {
        const posts = await listPostsByTag(tag, options)
        return res.json(posts)
      } else {
        const posts = await listAllPosts(options)
        return res.json(posts)
      }
    } catch (err) {
      return res.status(500).end()
    }
  })

  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
      const post = await getPostById(id)
      if (!post) {
        return res.status(404).end()
      }
      return res.json(post)
    } catch (err) {
      return res.status(500).end()
    }
  })

  // Add the following route handlers
  app.post('/api/v1/posts', requireAuth, async (req, res) => {
    try {
      const userId = req.auth?.sub
      if (!userId) {
        return res.status(401).end()
      }
      const post = await createPost(userId, req.body)
      return res.status(201).json(post)
    } catch (err) {
      return res.status(500).end()
    }
  })

  app.patch('/api/v1/posts/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    try {
      const userId = req.auth?.sub
      if (!userId) {
        return res.status(401).end()
      }
      if (req.body.author !== userId) {
        return res.status(403).end()
      }
      const post = await updatePost(id, req.body)
      if (!post) {
        return res.status(404).end()
      }
      return res.json(post)
    } catch (err) {
      return res.status(500).end()
    }
  })

  // curl -X DELETE http://localhost:3000/api/v1/posts/66e305335a70ae4e273d7fdd
  app.delete('/api/v1/posts/:id', requireAuth, async (req, res) => {
    const { id } = req.params
    try {
      const userId = req.auth?.sub
      if (!userId) {
        return res.status(401).end()
      }
      if (req.body.author !== userId) {
        return res.status(403).end()
      }
      const post = await deletePost(id)
      if (!post) {
        return res.status(404).end()
      }
      return res.status(204).end()
    } catch (err) {
      return res.status(500).end()
    }
  })
}
