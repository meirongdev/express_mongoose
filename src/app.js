import express from 'express'
import { postsRoutes } from './route/posts.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { usersRoutes } from './route/users.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())
postsRoutes(app)
usersRoutes(app)

export { app }
