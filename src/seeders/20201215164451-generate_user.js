'use strict';
import {
  v4 as uuidv4
} from 'uuid'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userInfo = {
        id: uuidv4(),
        name: 'Duy Nguyen',
        email: 'duynguyen@gmail.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    return queryInterface.bulkInsert('Users', [userInfo])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users')
  }
};
