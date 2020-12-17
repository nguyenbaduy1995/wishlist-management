import {
  factory
} from 'factory-girl'

import {
  Item
} from 'models'

factory.define('Items', Item, {
  name: factory.chance('name'),
  id: factory.chance('guid'),
})

export default {
  create: (attrs = {}) => factory.create('Items', attrs),
  createMany: (count = 2, attrs = {}) => factory.createMany('Items', count, attrs),
  attrs: (attrs = {}) => factory.attrs('Items', attrs)
}
