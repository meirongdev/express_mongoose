import express from 'express'
import { postsRoutes } from './route/posts.js'
const app = express()

postsRoutes(app)

export { app }
