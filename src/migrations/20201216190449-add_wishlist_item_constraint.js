'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      return queryInterface.addConstraint('WishListItems', {
        fields:  ['wishListId', 'itemId'],
        type: 'unique',
        name: 'wishListId_itemId_unique'
      }, { transaction });
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      return queryInterface.removeConstraint('WishListItems', 'wishListId_itemId_unique', { transaction })
    })
  }
};
