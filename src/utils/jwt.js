import jwt from 'jsonwebtoken'

import config from 'config'

const jwtSecret = config.jwtSecret

export const createJwtToken = (payload, options) => {
  return jwt.sign(payload, jwtSecret, options)
}

export const verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, payload) => {
      err ? reject(err) : resolve(payload)
    })
  })
}

export const decodeJwtToken = token => {
  return jwt.decode(token)
}
