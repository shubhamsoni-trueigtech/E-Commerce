'use strict';

module.exports = {

    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('ProductVariants', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,

                references: {
                    model: 'Products',
                    key: 'id'
                },

                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            color: {
                type: Sequelize.STRING
            },

            size: {
                type: Sequelize.STRING
            },

            sku: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            price: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },

            stock: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            status: {
                type: Sequelize.STRING,
                defaultValue: 'active'
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },

            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }

        });

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.dropTable('ProductVariants');

    }

};