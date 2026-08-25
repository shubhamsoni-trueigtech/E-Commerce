'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
      await queryInterface.addColumn("OrderItems", "productId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "Products",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

      await queryInterface.removeColumn("OrderItems", "productId");

  }
};
