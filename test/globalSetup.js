import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function globalSetup() {
  const mongoServer = new MongoMemoryServer({
    binary: {
      version: '7.6.0',
    },
  })
  global.__MONGOINSTANCE = mongoServer
  process.env.DB_URL = await mongoServer.getUri()
}
