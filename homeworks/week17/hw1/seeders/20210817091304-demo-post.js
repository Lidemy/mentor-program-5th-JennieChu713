'use strict';

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
   await queryInterface.bulkDelete('Posts', null, {})
   const demoPosts = [
     {
      title: 'demo post1',
      content: 'this is a demo posts',
    },
    {
      title: 'demo post2',
      content: 'this is a demo posts2',
    },
    {
      title: 'demo post3',
      content: 'this is a demo posts3',
    }
   ]
   for (let post of demoPosts) {
     const { title, content } = post
     await queryInterface.bulkInsert('Posts', [{
       title,
       content,
       createdAt: new Date(),
       updatedAt: new Date(),
       CategoryId: 1,
       UserId: 1
      }], {})
    }
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
