import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

const conn = await initDatabase()
const post = new Post({
  title: 'Hello, world!',
  author: 'admin',
  content: 'This is a test post.',
  tags: ['test'],
})
await post.save()

const posts = await Post.find()
console.log(posts)

await conn.disconnect()
