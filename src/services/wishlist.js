import {
  WishList, Item, WishListItem
} from 'models'

import { get } from 'lodash'

class WishListService {
  constructor() {
    this.model = WishList
  }

  async create(user, items) {
    const normalizedItems = items.map(item => ({ itemId: item.id, quantity: item.quantity }))

    const wishlist = await this.model.createWithItems(user, normalizedItems)

    return { ...wishlist.wishlist, items: wishlist.items }
  }

  async findOne(query) {
    return this.model.findOne({ where: query })
  }

  async getDetails(id) {
    return this.model.findOne({
      where: { id },
      include: {
        model: WishListItem,
        as: 'items',
        include: {
          model: Item,
          as: 'item'
        }
      }
    })
  }

  async list(user, options) {
    const limit = get(options, 'limit', 10)
    const offset = get(options, 'offset', 0)
    let query = {}

    if (user) {
      query.userId = user.id
    }

    return this.model.findAll({ where: query, limit, offset })
  }

  async update(wishlist, items) {
    const normalizedItems = items.map(item => ({ itemId: item.id, quantity: item.quantity }))
    const invalidItems = normalizedItems.filter(item => item.quantity < 0)

    if (invalidItems.length > 0) {
      throw new Error('Item quantity cannot be negative')
    }
    const updateItems = normalizedItems.filter(item => item.quantity > 0)
    const removeItems = normalizedItems.filter(item => item.quantity === 0)
    return wishlist.updateItems(updateItems, removeItems)
  }
}

export default new WishListService()
