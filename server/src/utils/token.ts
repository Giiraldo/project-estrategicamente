import jwt from 'jsonwebtoken'
import { getJwtSecret } from '../config'

export function signToken(userId: string): string {
  return jwt.sign({}, getJwtSecret(), {
    subject: userId,
    expiresIn: '7d',
  })
}
