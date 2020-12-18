import {
  Router
} from 'express'

import { verifyJwtToken } from 'utils/jwt'

import WishListRouter from './wishlist'

import UserService from 'services/user'

import constants from '../constants'

import { User } from 'models'

const router = Router()

router.get('/', (req, res) => {
  res.status(200).send('Hello from  Wishlist Management')
})

/* For testing only */
router.get('/access-token', async (req, res) => {
  const user = await User.findOne()
  const token = user.generateAccessToken()
  res.status(200).send(token)
})
/*  For testing only */

const authenticate = async (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({ message: constants.RESPONSE.UNAUTHORIZED })
  }
  try {
    const payload = await verifyJwtToken(req.headers.token)
    if (payload && payload.id) {
      const user = await UserService.getById(payload.id)

      if (user) {
        req.user = user
        next()
      } else {
        throw new Error()
      }
    } else {
      throw new Error()
    }
  } catch (error) {
    res.status(401).json({ message: constants.RESPONSE.UNAUTHORIZED })
  }
}

router.use('/wishlists', authenticate, WishListRouter)

export default router
