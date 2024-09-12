import {
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
} from '../service/posts.js'

export function postsRoutes(app) {
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
}
