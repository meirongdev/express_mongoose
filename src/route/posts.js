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
  // curl -X POST http://localhost:3000/api/v1/posts -H 'Content-Type: application/json' -d '{"author":"author1","title":"title1","content":"content1","tags":["tag1","tag2"]}'
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body)
      return res.status(201).json(post)
    } catch (err) {
      return res.status(500).end()
    }
  })

  // curl -X PATCH http://localhost:3000/api/v1/posts/66e305335a70ae4e273d7fdd -H 'Content-Type: application/json' -d '{"author":"author1","title":"title1","content":"content1","tags":["tag1","tag2"]}'
  app.patch('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
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
  app.delete('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params
    try {
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
