import mongoose from 'mongoose'

const DB_URL = 'mongodb://localhost:27017/blog'

export function initDatabase() {
  mongoose.connection.on('open', () => {
    console.log('MongoDB connection opened')
  })
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err)
  })
  const connection = mongoose.connect(DB_URL, {
    user: 'test',
    pass: 'test',
    authSource: 'admin',
  })
  return connection
}
