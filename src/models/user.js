import { createJwtToken } from 'utils/jwt'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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

  User.associate = models => {
    User.hasMany(models.WishList, {
      foreignKey: 'userId',
      as: 'wishlist'
    })
  }

/* Prototype */

  User.prototype.generateAccessToken = function () {
    return createJwtToken({ id: this.id })
  }

  return User
}
