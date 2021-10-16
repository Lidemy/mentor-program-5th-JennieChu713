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
    await queryInterface.bulkDelete('Prizes', null, {});
    const demoPrizes = [
     {
       image: 'https://cdn.pixabay.com/photo/2019/07/04/06/35/flight-4315953_1280.jpg',
       name: '日本東京來回雙人遊',
       rate: 5,
       description: '恭喜你中頭獎了！日本東京來回雙人遊！',
       amount:1
     },
     {
      image: 'https://cdn.pixabay.com/photo/2016/11/30/08/46/living-room-1872192_1280.jpg',
      name: '90 吋電視一台',
      rate: 15,
      description: '二獎！90 吋電視一台！',
      amount:3
    },
    {
      image: 'https://cdn.pixabay.com/photo/2017/08/10/03/00/youtube-2617510_1280.jpg',
      name: '知名 YouTuber 簽名握手會入場券一張',
      rate: 30,
      description: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
      amount: 10
    }
   ]
   for (let prize of demoPrizes) {
     const { image, name, rate, description, amount } = prize
    await queryInterface.bulkInsert('Prizes', [{
      image,
      name,
      rate,
      description,
      amount,
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
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
};
