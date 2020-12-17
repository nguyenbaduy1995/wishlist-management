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

export const getWishListByID = async (user, wishListId) => {
  return WishListService.findOne({ userId: user.id, id: wishListId })
}

export const getWishList = async (req, res) => {
  const wishlist = await WishListService.getDetails(req.wishlist.id)

  res.status(200).json(generateSuccessResponse(constants.RESPONSE.GET_WISH_LIST_SUCCESSFULLY, wishlist))
}

export const listWishList = async (req, res) => {
  const wishlists = await WishListService.list(req.user, req.query)
  res.status(200).json(generateSuccessResponse(constants.RESPONSE.LIST_WISH_LIST_SUCCESSFULLY, wishlists ))
}

export const updateWishList = async (req, res) => {
  try {
    const wishlist = req.wishlist
    const { items } = req.body
    await WishListService.update(wishlist, items)
    res.status(200).json(generateSuccessResponse(constants.RESPONSE.UPDATE_WISH_LIST_SUCCESSFULLY, {}))
  } catch (error) {
    console.log(error)
    res.status(400).json(generateErrorResponse(constants.RESPONSE.UPDATE_WISH_LIST_FAILED))
  }
}
