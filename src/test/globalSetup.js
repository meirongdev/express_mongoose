import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function globalSetup() {
  const mongoServer = await MongoMemoryServer.create()
  global.__MONGOINSTANCE = mongoServer
  process.env.DB_URI = await mongoServer.getUri()
  // process.env.DB_USER = await mongoServer.auth('test', 'test')
}
