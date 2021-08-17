'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkDelete('Users', null, {})
   const addSalt = 10
   await bcrypt.hash("admin", addSalt).then(function(hashed) {
     queryInterface.bulkInsert('Users', [{
       id: 1,
       username: 'admin',
       nickname: 'example',
       password: hashed,
       introduction: 'this is an example.',
       createdAt: new Date(),
       updatedAt: new Date()
      }],{})
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
