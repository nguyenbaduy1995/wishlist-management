import {
  factory
} from 'factory-girl'

import {
  WishList
} from 'models'

factory.define('WishLists', WishList, {
  id: factory.chance('guid'),
  userId: factory.assoc('Users', 'id')
})

export default {
  create: (attrs = {}) => factory.create('WishLists', attrs),
  createMany: (count = 2, attrs = {}) => factory.createMany('WishLists', count, attrs),
  attrs: (attrs = {}) => factory.attrs('WishLists', attrs)
}
