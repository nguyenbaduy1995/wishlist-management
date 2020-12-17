'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable('WishLists', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
      }, { transaction })

      await queryInterface.createTable('WishListItems', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        wishListId: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'WishLists',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        itemId: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Items',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
      }, { transaction })
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.dropTable('WishListItems', { transaction })
      await queryInterface.dropTable('WishLists', { transaction })
    })
  }
};
