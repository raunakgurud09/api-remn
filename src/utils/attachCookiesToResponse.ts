import { Response } from 'express'

export const attachCookiesToResponse = (
  res: Response,
  toAttach: string,
  options: any
) => {
  const oneDayExpire = 1000 * 60 * 60 * 24 //24 hours

  res.cookie(toAttach, options, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // signed: true,
    expires: new Date(Date.now() + oneDayExpire)
  })
}
