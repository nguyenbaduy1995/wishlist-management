import supertest from 'supertest'
import uuid from 'uuid/v4'
import app from 'app'

import UserFactory from '../factories/user'
import ItemFactory from '../factories/item'
import WishListFactory from '../factories/wishlist'
import WishListItemFactory from '../factories/wishlist_item'

import constants from '../../src/constants'

describe('GET /wishlists', () => {
  const request = supertest(app)
  const endpoint = '/wishlists'

  let user
  let token

  beforeEach(async () => {
    user = await UserFactory.create()
    token = await user.generateAccessToken()
  })

  describe('Unauthenticate request', () => {
    it('returns status 401', async () => {
      const response = await request.get(endpoint)
      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual(constants.RESPONSE.UNAUTHORIZED)
    })
  })
  describe('Get wishlist list successfully', () => {
    let item, wishlist
    beforeEach(async () => {
      item = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item.id, quantity: 10 })
    })
    it('returns wishlist with items', async () => {
      const response = await request.get(endpoint).set('token', token)

      expect(response.status).toEqual(200)
      const { success, message, data } = response.body
      expect(success).toEqual(true)
      expect(message).toEqual(constants.RESPONSE.LIST_WISH_LIST_SUCCESSFULLY)
      expect(data.length).toEqual(1)
      expect(data[0].id).toEqual(wishlist.id)
    })
  })

  describe('Get wishlist detail successfully', () => {
    let item, wishlist
    beforeEach(async () => {
      item = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item.id, quantity: 10 })
    })
    it('returns wishlist with items', async () => {
      const response = await request.get(`${endpoint}/${wishlist.id}`).set('token', token)

      expect(response.status).toEqual(200)
      const { success, message, data } = response.body
      expect(success).toEqual(true)
      expect(message).toEqual(constants.RESPONSE.GET_WISH_LIST_SUCCESSFULLY)
      expect(data.id).toEqual(wishlist.id)
      expect(data.items.length).toEqual(1)
      expect(data.items[0].itemId).toEqual(item.id)
      expect(data.items[0].quantity).toEqual(10)
    })
  })

  describe('Get wishlist detail failed: wishlist not exists', () => {
    let item, wishlist
    beforeEach(async () => {
      item = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item.id, quantity: 10 })
    })
    it('returns error', async () => {
      const response = await request.get(`${endpoint}/${uuid()}`).set('token', token)

      expect(response.status).toEqual(400)
      const { success, message, data } = response.body
      expect(success).toEqual(false)
      expect(message).toEqual(constants.RESPONSE.WISH_LIST_NOT_FOUND)
    })
  })
})
