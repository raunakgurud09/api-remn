import { OAuth2Client } from 'google-auth-library'
import config from '../configs/index.config'

const client = new OAuth2Client(config.GOOGLE_WEB_CLIENT_ID)

export const Google = {
  verifyIdToken: async (token: string) => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: [config.GOOGLE_WEB_CLIENT_ID, config.GOOGLE_ANDROID_CLIENT_ID]
      })
      const payload = ticket.getPayload()
      return payload
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
