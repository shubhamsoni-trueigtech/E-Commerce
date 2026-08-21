'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        foreignKey : 'categoryId'
      });

      Product.hasMany(models.ProductImage, {
          foreignKey : 'productId'
      })

      Product.hasMany(models.ProductVariant, {
          foreignKey : 'productId',
          // as : "Variants"
      })

      Product.hasMany(models.CartItem, {
        foreignKey: 'productId',
        as : "cartItems"
    })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    status: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    // paranoid : true
  });
  return Product;
};