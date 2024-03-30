import { get } from 'lodash'
import { Request, Response, NextFunction } from 'express'
import { decode } from '../utils/jwt.utils'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )
  // console.log(req.headers)
  const refreshToken = get(req, 'headers.cookie') as string

  if (!accessToken) return next()

  const { decoded, expired } = await decode(accessToken)

  if (decoded) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = decoded

    return next()
  }

  
  return next()
}

export default deserializeUser


// if (expired && refreshToken) {
//   const newAccessToken = await reIssueAccessToken({ refreshToken })

//   if (newAccessToken) {
//     // Add the new access token to the response header
//     res.setHeader('x-access-token', newAccessToken)

//     const { decoded } = await decode(newAccessToken)

//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     req.user = decoded
//   }

//   return next()
// }