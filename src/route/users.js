import { createUser, loginUser, getUserById } from '../service/users.js'

export function usersRoutes(app) {
  // Add the following route handler
  // curl -X POST http://localhost:3000/api/v1/user/signup -H 'Content-Type: application/json' -d '{"username":"user1","password":"pass"}'
  app.post('/api/v1/users/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (err) {
      return res.status(500).end()
    }
  })

  // Login
  // curl -X POST http://localhost:3000/api/v1/user/signin -H 'Content-Type: application/json' -d '{"username":"user1","password":"pass"}'
  app.post('/api/v1/users/signin', async (req, res) => {
    try {
      const token = await loginUser(req.body)
      return res.status(200).send({ token })
    } catch (err) {
      return res.status(400).send({
        error: 'login failed',
      })
    }
  })

  app.get('/api/v1/users/:id', async (req, res) => {
    try {
      const user = await getUserById(req.params.id)
      if (!user) {
        return res.status(404).end()
      }
      return res.json(user)
    } catch (err) {
      return res.status(500).end()
    }
  })
}
