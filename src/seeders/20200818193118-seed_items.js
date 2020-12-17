'use strict';
import Chance from 'chance'
import {
  v4 as uuidv4
} from 'uuid'

const chance = new Chance()
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [...Array(100)].map((_, i) => {
      return {
        id: uuidv4(),
        name: `Item ${i}`,
        price: chance.integer({ min: 0, max: 100000 }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    return queryInterface.bulkInsert('Items', data)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items')
  }
};
