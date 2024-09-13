import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../db/models/user.js'
import dotenv from 'dotenv'
dotenv.config()
export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
}

export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('invalid user')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('invalid user')
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '2hr',
  })
  const isValid = jwt.verify(token, process.env.JWT_SECRET)
  if (!isValid) {
    throw new Error('invalid token')
  }
  return token
}

export async function getUserById(userId) {
  return await User.findById(userId)
}
