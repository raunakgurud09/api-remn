import crypto from 'crypto'

export const createHash = () => {
  return crypto.randomBytes(40).toString('hex')
}
