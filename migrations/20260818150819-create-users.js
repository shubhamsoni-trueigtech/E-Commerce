'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('Users', { 
      id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },

      name : {
        type : Sequelize.STRING,
        allowNull : false
      },

      email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
      },

      password : {
        type : Sequelize.STRING,
        allowNull : false
      },

      status : {
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue : "active"
      },

      createdAt : {
        type : Sequelize.DATE,
        allowNull : false
      },

      updatedAt : {
        type : Sequelize.DATE,
        allowNull : false
      },

      deletedAt : {
        type : Sequelize.DATE,
        allowNull : true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('Users');
  
  }
};
