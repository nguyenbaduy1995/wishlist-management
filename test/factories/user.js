import {
  factory
} from 'factory-girl'

import {
  User
} from 'models'

factory.define('Users', User, {
  name: factory.chance('name'),
  email: factory.chance('email'),
  password: factory.chance('string'),
  id: factory.chance('guid'),
})

export default {
  create: (attrs = {}) => factory.create('Users', attrs),
  createMany: (count = 2, attrs = {}) => factory.createMany('Users', count, attrs),
  attrs: (attrs = {}) => factory.attrs('Users', attrs)
}
