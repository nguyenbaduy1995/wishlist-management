import supertest from 'supertest'
import uuid from 'uuid/v4'
import app from 'app'

import { WishList, WishListItem } from 'models'

import UserFactory from '../factories/user'
import ItemFactory from '../factories/item'

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
      const response = await request.post(endpoint).send({
        items: []
      })
      expect(response.status).toEqual(401)
      expect(response.body.message).toEqual(constants.RESPONSE.UNAUTHORIZED)
      expect((await WishList.findAll()).length).toEqual(0)
    })
  })
  describe('Create wishlist successfully with empty items', () => {
    it('returns wishlist with empty items', async () => {
      const response = await request.post(endpoint).set('token', token).send({
        items: []
      })

      expect(response.status).toEqual(201)
      const { success, message, data } = response.body
      expect(success).toEqual(true)
      expect(message).toEqual(constants.RESPONSE.CREATE_WISH_LIST_SUCCESSFULLY)
      expect(data.items).toEqual([])

      expect(await WishList.findByPk(data.id)).toBeDefined()

    })
  })

  describe('Create wishlist successfully with items', () => {
    let item1, item2
    beforeEach(async () => {
      item1 = await ItemFactory.create()
      item2 = await ItemFactory.create()
    })

    it('returns created wishlist with wishlist items', async () => {
      const response = await request.post(endpoint).set('token', token).send({
        items: [{
          id: item1.id,
          quantity: 1
        }, {
          id: item2.id,
          quantity: 2
        }]
      })

      expect(response.status).toEqual(201)
      const { success, message, data } = response.body
      expect(success).toEqual(true)
      expect(message).toEqual(constants.RESPONSE.CREATE_WISH_LIST_SUCCESSFULLY)

      const wishlists = await WishList.findAll()

      expect(wishlists.length).toEqual(1)

      expect(data.id).toEqual(wishlists[0].id)

      const wishlistItem1 = await WishListItem.findOne({ where: { wishListId: wishlists[0].id, itemId: item1.id } })
      const wishlistItem2 = await WishListItem.findOne({ where: { wishListId: wishlists[0].id, itemId: item2.id }})

      expect(wishlistItem1.quantity).toEqual(1)
      expect(wishlistItem2.quantity).toEqual(2)

    })
  })

  describe('Create wishlist failed with item quantity less than 0', () => {
    let item1, item2
    beforeEach(async () => {
      item1 = await ItemFactory.create()
      item2 = await ItemFactory.create()
    })

    it('returns created wishlist with wishlist items', async () => {
      const response = await request.post(endpoint).set('token', token).send({
        items: [{
          id: item1.id,
          quantity: -1
        }, {
          id: item2.id,
          quantity: 2
        }]
      })

      expect(response.status).toEqual(400)
      const { success, message, data } = response.body
      expect(success).toEqual(false)
      expect(message).toEqual(constants.RESPONSE.CREATE_WISH_LIST_FAILED)

      const wishlists = await WishList.findAll()

      expect(wishlists.length).toEqual(0)
    })
  })

  describe('Create wishlist failed with item not exists', () => {
    let item1, item2
    beforeEach(async () => {
      item1 = await ItemFactory.create()
      item2 = await ItemFactory.create()
    })

    it('returns created wishlist with wishlist items', async () => {
      const response = await request.post(endpoint).set('token', token).send({
        items: [{
          id: uuid(),
          quantity: 2
        }, {
          id: item2.id,
          quantity: 2
        }]
      })

      expect(response.status).toEqual(400)
      const { success, message, data } = response.body
      console.log(message)
      expect(success).toEqual(false)
      expect(message).toEqual(constants.RESPONSE.CREATE_WISH_LIST_FAILED)

      const wishlists = await WishList.findAll()

      expect(wishlists.length).toEqual(0)
    })
  })
})
