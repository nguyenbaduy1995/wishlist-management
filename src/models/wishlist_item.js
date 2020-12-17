module.exports = (sequelize, DataTypes) => {
  const WishListItem = sequelize.define('WishListItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Items',
        key: 'id'
      }
    },
    wishListId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Wishlists',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
  }, {
    indexes: [{
      unique: true,
      fields: ['itemId', 'wishListId'],
      name: 'wishListId_itemId_unique'
    }]
  })

  WishListItem.associate = models => {
    WishListItem.belongsTo(models.WishList, {
      foreignKey: 'wishListId',
      as: 'wishlist'
    })

    WishListItem.belongsTo(models.Item, {
      foreignKey: 'itemId',
      as: 'item'
    })
  }

  return WishListItem
}
