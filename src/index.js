import dotenv from 'dotenv'
import { app } from './app.js'
import { initDatabase } from './db/init.js'
dotenv.config()

try {
  const PORT = process.env.PORT || 3000
  await initDatabase()
  app.listen(PORT)
  console.log(`Server running on http://localhost:${PORT}`)
} catch (err) {
  console.error('Error starting server:', err)
}
