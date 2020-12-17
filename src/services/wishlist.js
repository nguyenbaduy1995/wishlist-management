import {
  WishList, Item, WishListItem
} from 'models'

import { get } from 'lodash'

class WishListService {
  constructor() {
    this.model = WishList
  }

  async create(user, items) {
    if (!user) {
      throw new Error()
    }

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

export default new WishListService()
