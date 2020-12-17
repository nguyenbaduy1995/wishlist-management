module.exports = (sequelize, DataTypes) => {
  const WishList = sequelize.define('WishList', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      foreignKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  })

  WishList.associate = models => {
    WishList.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    WishList.hasMany(models.WishListItem, {
      foreignKey: 'wishListId',
      as: 'items'
    })
  }

  /* Static */

  WishList.createWithItems = async function (user, items) {
    const { WishListItem } = sequelize.models
    return sequelize.transaction(async transaction => {
      const wishlist = await WishList.create({ userId: user.id }, { transaction })
      const itemsInput = items.map(item => ({ ...item, wishListId: wishlist.id }))
      const wishlistItems = await WishListItem.bulkCreate(itemsInput, {
        validate: true,
        transaction
      })
      return { wishlist: wishlist.toJSON(), items: wishlistItems }
    })
  }

  /* Prototype */

  WishList.prototype.updateItems = async function (items) {
    const { WishListItem } = sequelize.models
    const itemsInputs = items.map(item => ({ ...item, wishListId: this.id }))
    return sequelize.transaction(async transaction => {
      return Promise.all(itemsInputs.map(async item => {
        return WishListItem.upsert(item, {
          transaction
        })
      }))
    })
  }

  return WishList
}
