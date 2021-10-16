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
    await queryInterface.bulkDelete('Menus', null, {});
    const cuisines = [
      '輕盈高麗卷湘南',
      '鮮嫩洋芋白丁佐莎莎',
      '六彩雙茄起司沙拉',
      '豆芽涼拌羅勒小金磚'
    ]
    const images = [
      '/img/f-001.png',
      '/img/f-002.png',
      '/img/f-003.png',
      '/img/f-004.png'
    ]
    
    function randPick(num) {
      return Math.floor(Math.random() * num)
    }
    function randPrice() {
      return Math.floor(Math.random() * 200) + 200
    }
    for (let i = 0; i < 12; i++) {
      let name = cuisines[randPick(cuisines.length)]
      let image = images[randPick(images.length)]
      let price = randPrice()
      await queryInterface.bulkInsert('Menus', [{
        image: image,
        name: name,
        price: price,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
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
};
