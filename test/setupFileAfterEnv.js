import mongoose from 'mongoose'
import { beforeAll, afterAll } from '@jest/globals'
import { initDatabase } from '../db/init.js'

beforeAll(async () => {
  const conn = await initDatabase()
  global.__MONGOOSECONN = conn
})

afterAll(async () => {
  const conn = global.__MONGOOSECONN
  if (conn) {
    await conn.disconnect()
  }
})
