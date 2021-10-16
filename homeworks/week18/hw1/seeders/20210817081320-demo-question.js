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
    await queryInterface.bulkDelete('Questions', null, {});
    const questions = [
      '如何辦理退貨？',
      '目前提供哪些付款方式？',
      '線上刷卡如何操作呢？',
      '如何查詢目前訂單的處理情況？',
      '訂單成立後，是否可以取消或是更改訂單數量及商品？',
      '我想購買的商品已經缺貨，什麼時候會進貨呢？'
    ]
 
    const answers = [
      '這是一個很深奧的問題，等我跟宇宙連上後再為您解答。',
      '（空白。',
      '我得再想想。',
      '有話好說別這樣。',
      '目前的狀況是在有和沒有之間。'
    ]
    function rand(num){
      return Math.floor(Math.random() * num)
    }
    for (let i = 0; i < 12; i++) {
      let answer = answers[rand(answers.length)]
      let question = questions[rand(questions.length)]
      await  queryInterface.bulkInsert('Questions', [{
        question: question,
        answer: answer,
        seqOrder: i+1,
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
