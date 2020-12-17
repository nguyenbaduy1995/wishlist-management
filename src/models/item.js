module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
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

  Item.associate = models => {
    Item.belongsToMany(models.WishList, {
      through: 'WishListItemMaps',
      as: 'wishlists'
    })
  }

  return Item
}
