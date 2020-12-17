import constants from '../constants';
import WishListService from 'services/wishlist'

import { generateSuccessResponse, generateErrorResponse } from 'utils'

export const createWishList = async (req, res) => {
  try {
    const user = req.user
    const { items } = req.body
    const wishlist = await WishListService.create(user, items)
    return res.status(201).json(generateSuccessResponse(constants.RESPONSE.CREATE_WISH_LIST_SUCCESSFULLY, wishlist))
  } catch (error) {
    console.log(error)
    return res.status(400).json(generateErrorResponse(constants.RESPONSE.CREATE_WISH_LIST_FAILED))
  }
}
