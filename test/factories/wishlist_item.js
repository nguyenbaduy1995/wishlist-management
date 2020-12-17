import {
  factory
} from 'factory-girl'

import {
  WishListItem
} from 'models'

factory.define('WishListItems', WishListItem, {
  wishListId: factory.assoc('WishLists', 'id'),
  itemId: factory.assoc('Items', 'id'),
  quantity: factory.chance('integer', { min: 0, max: 100 })
})

export default {
  create: (attrs = {}) => factory.create('WishListItems', attrs),
  createMany: (count = 2, attrs = {}) => factory.createMany('WishListItems', count, attrs),
  attrs: (attrs = {}) => factory.attrs('WishListItems', attrs)
}
