'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ProductVariant extends Model {

        static associate(models) {

            ProductVariant.belongsTo(models.Product, {
                foreignKey: 'productId'
            });

        }

    }

    ProductVariant.init({

        productId: DataTypes.INTEGER,

        color: DataTypes.STRING,

        size: DataTypes.STRING,

        sku: DataTypes.STRING,

        price: DataTypes.DECIMAL,

        stock: DataTypes.INTEGER,

        status: DataTypes.STRING

    }, {

        sequelize,
        modelName: 'ProductVariant'

    });

    return ProductVariant;
};