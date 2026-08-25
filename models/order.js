'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Order extends Model {

        static associate(models) {

            Order.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });

            // Order.hasMany(models.OrderItem, {
            //     foreignKey: 'orderId',
            //     as: 'orderItems'
            // });

            // Order.hasOne(models.Payment, {
            //     foreignKey: 'orderId',
            //     as: 'payment'
            // });

        }

    }

    Order.init({
        userId: DataTypes.INTEGER,
        totalAmount: DataTypes.DECIMAL,
        status: DataTypes.STRING,
        shippingAddress: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Order'
    });

    return Order;
};
