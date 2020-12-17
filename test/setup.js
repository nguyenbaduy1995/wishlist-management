import sinon from 'sinon'
import {
  sequelize
} from 'models'

import truncate from './truncate'

beforeAll(() => {
  sinon.stub(console, 'log')
})

beforeEach(async () => {
  await truncate()
})

afterEach(() => {
  sinon.restore()
})

afterAll(async () => {
  await sequelize.close()
})
