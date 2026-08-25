'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // associations yahan baad mein aayengi
      User.hasOne(models.Cart, {
        foreignKey : "userId"
      })
    }

  }
  
  User.init(
    {
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

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
      },

      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
      },

      role: {
        type: DataTypes.STRING,
        // allowNull: false,
        // defaultValue: 'user'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
      paranoid: true
    }
  );

  return User;
};
