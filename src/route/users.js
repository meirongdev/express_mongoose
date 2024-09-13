import { createUser } from '../service/users.js'

export function usersRoutes(app) {
  // Add the following route handler
  // curl -X POST http://localhost:3000/api/v1/user/signup -H 'Content-Type: application/json' -d '{"username":"user1","password":"pass"}'
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const user = await createUser(req.body)
      return res.status(201).json({ username: user.username })
    } catch (err) {
      return res.status(500).end()
    }
  })
}
