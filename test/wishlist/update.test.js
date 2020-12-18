import supertest from 'supertest'
import uuid from 'uuid/v4'
import app from 'app'

import { WishList, WishListItem } from 'models'

import UserFactory from '../factories/user'
import ItemFactory from '../factories/item'
import WishListFactory from '../factories/wishlist'
import WishListItemFactory from '../factories/wishlist_item'

import constants from '../../src/constants'

describe('POST /wishlists', () => {
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
      const response = await request.put(`${endpoint}/${uuid()}`).send({
        items: []
      })
      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual(constants.RESPONSE.UNAUTHORIZED)
      expect((await WishList.findAll()).length).toEqual(0)
    })
  })

  describe('Update wishlist with existed item successfully', () => {
    let item, wishlist

    beforeEach(async () => {
      item = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item.id, quantity: 10 })
    })

    it('returns wishlist with empty items', async () => {
      const _wishListItem = await WishListItem.findOne({ where: { wishListId: wishlist.id, itemId: item.id } })
      expect(_wishListItem.quantity).toEqual(10)

      const response = await request.put(`${endpoint}/${wishlist.id}`).set('token', token).send({
        items: [{
          id: item.id,
          quantity: 5
        }]
      })

      expect(response.status).toEqual(200)
      const { success, message, data } = response.body
      expect(success).toEqual(true)
      expect(message).toEqual(constants.RESPONSE.UPDATE_WISH_LIST_SUCCESSFULLY)
      await _wishListItem.reload()
      expect(_wishListItem.quantity).toEqual(5)
    })
  })

  describe('Update wishlist by adding items successfully', () => {
    let item1, item2, wishlist

    beforeEach(async () => {
      item1 = await ItemFactory.create()
      item2 = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item1.id, quantity: 10 })
    })

    it('returns wishlist with empty items', async () => {
      let _wishListItems = await WishListItem.findAll({ where: { wishListId: wishlist.id } })
      expect(_wishListItems.length).toEqual(1)

      const response = await request.put(`${endpoint}/${wishlist.id}`).set('token', token).send({
        items: [{
          id: item2.id,
          quantity: 5
        }]
      })

      expect(response.status).toEqual(200)
      const { success, message, data } = response.body
      expect(success).toEqual(true)
      expect(message).toEqual(constants.RESPONSE.UPDATE_WISH_LIST_SUCCESSFULLY)

      _wishListItems = await WishListItem.findAll({ where: { wishListId: wishlist.id } })
      expect(_wishListItems.length).toEqual(2)
    })
  })

  describe('Update wishlist by remove items successfully', () => {
    let item1, item2, wishlist

    beforeEach(async () => {
      item1 = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item1.id, quantity: 10 })
    })

    it('returns wishlist with empty items', async () => {
      let _wishListItems = await WishListItem.findAll({ where: { wishListId: wishlist.id } })
      expect(_wishListItems.length).toEqual(1)

      const response = await request.put(`${endpoint}/${wishlist.id}`).set('token', token).send({
        items: [{
          id: item1.id,
          quantity: 0
        }]
      })

      expect(response.status).toEqual(200)
      const { success, message, data } = response.body
      expect(success).toEqual(true)
      expect(message).toEqual(constants.RESPONSE.UPDATE_WISH_LIST_SUCCESSFULLY)

      _wishListItems = await WishListItem.findAll({ where: { wishListId: wishlist.id } })
      expect(_wishListItems.length).toEqual(0)
    })
  })

  describe('Update wishlist failed with quantity less than 0', () => {
    let item, wishlist

    beforeEach(async () => {
      item = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item.id, quantity: 10 })
    })

    it('returns error', async () => {
      const _wishListItem = await WishListItem.findOne({ where: { wishListId: wishlist.id, itemId: item.id } })
      expect(_wishListItem.quantity).toEqual(10)

      const response = await request.put(`${endpoint}/${wishlist.id}`).set('token', token).send({
        items: [{
          id: item.id,
          quantity: -5
        }]
      })

      expect(response.status).toEqual(400)
      const { success, message, data } = response.body
      expect(success).toEqual(false)
      expect(message).toEqual(constants.RESPONSE.UPDATE_WISH_LIST_FAILED)
      await _wishListItem.reload()
      expect(_wishListItem.quantity).toEqual(10)
    })
  })

  describe('Update wishlist failed  with non-existed items', () => {
    let item, wishlist

    beforeEach(async () => {
      item = await ItemFactory.create()
      wishlist = await WishListFactory.create({ userId: user.id })
      await WishListItemFactory.create({ wishListId: wishlist.id, itemId: item.id, quantity: 10 })
    })

    it('returns error', async () => {
      const preUpdateItems = await wishlist.getItems()

      expect(preUpdateItems.length).toEqual(1)

      const response = await request.put(`${endpoint}/${wishlist.id}`).set('token', token).send({
        items: [{
          id: uuid(),
          quantity: 10
        }]
      })

      expect(response.status).toEqual(400)
      const { success, message, data } = response.body
      expect(success).toEqual(false)
      expect(message).toEqual(constants.RESPONSE.UPDATE_WISH_LIST_FAILED)

      const postUpdateItems = await wishlist.getItems()
      expect(postUpdateItems.length).toEqual(1)
      expect(postUpdateItems[0].itemId).toEqual(preUpdateItems[0].itemId)
      expect(postUpdateItems[0].quantity).toEqual(preUpdateItems[0].quantity)
    })
  })
})
