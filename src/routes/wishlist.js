import {
  Router
} from 'express'
import {
  createWishList,
  getWishList,
  getWishListByID,
  listWishList,
  updateWishList
} from 'controllers/wishlist'

import constants from '../constants'
import { generateErrorResponse } from 'utils'

const router = new Router()

const validateWishList = async (req, res, next) => {
  const user = req.user
  const { id } = req.params
  try {
    const wishlist = await getWishListByID(user, id)
    if (wishlist) {
      req.wishlist = wishlist
      next()
    } else {
      res.status(400).json(generateErrorResponse(constants.RESPONSE.WISH_LIST_NOT_FOUND))
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(generateErrorResponse(error.message))
  }
}

router.post('', createWishList)
