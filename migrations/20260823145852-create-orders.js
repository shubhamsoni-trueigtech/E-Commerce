'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
    */
     await queryInterface.createTable('Orders', { 
      id: {
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.INTEGER
      },

      userId : {
        type : Sequelize.INTEGER,
        allowNull : false,

        references : {
          model : "Users",
          key : "id"
        },

        onUpdate : "CASCADE",
        onDelete : "CASCADE"
      },

      totalAmount : {
        type : Sequelize.DECIMAL,
        allowNull : false
      },

      status : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : "pending"
      },

      shippingAddress : {
        type : Sequelize.TEXT,
        allowNull : false
      },

      createdAt : {
        allowNull : false,
        type : Sequelize.DATE
      },

      updatedAt : {
        allowNull : false,
        type : Sequelize.DATE
      }
 
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    */
      await queryInterface.dropTable('Orders');
  }
};
