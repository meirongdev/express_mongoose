import mongoose from 'mongoose'

export function initDatabase() {
  // const DB_URL = process.env.DB_URL || 'localhost:27017'
  // const DB_SCHEMA = process.env.DB_SCHEMA || 'blog'
  // const DB_USER = process.env.DB_USER || 'test'
  // const DB_PASS = process.env.DB_PASS || 'test'
  // const DB_AUTH_SOURCE = process.env.DB_AUTH_SOURCE || 'admin'
  // mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
  const DB_URI = process.env.DB_URI
  // ||
  // `mongodb://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_SCHEMA}?authSource=${DB_AUTH_SOURCE}`
  // console.log('Connecting to MongoDB:', DB_URI)
  mongoose.connection.on('open', () => {
    console.log('MongoDB connection opened')
  })
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err)
  })
  const connection = mongoose.connect(DB_URI)
  return connection
}
