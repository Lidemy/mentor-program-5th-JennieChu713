const { fail, success } = require('./middlewares')
const db = require('../models')

const { Prize } = db

async function winPrize() {
  const prizes = await Prize.findAll({
    order: [
      ['rate', 'DESC']
    ]
  })
  const randRate = Math.floor(Math.random() * 100) + 1
  const prizeRate = await Prize.sum('rate')

  let result = null
  if (randRate <= prizeRate) {
    for (const prize of prizes) {
      if (randRate <= prize.rate) {
        result = prize
      }
    }
  }
  return result
}

const prizeControllers = {
  index: (req, res) => {
    res.render('prize')
  },

  result: async(req, res, next) => {
    try {
      const prize = await winPrize()
      res.render('prize/result', {
        prize
      })
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return next()
    }
  },

  // backstage
  listout: async(req, res, next) => {
    if (res.locals.username) {
      try {
        const prizes = await Prize.findAll()
        if (prizes) {
          res.render('prize/list', {
            prizes
          })
        }
      } catch (err) {
        req.flash('errorMsg', err.toString())
        return next()
      }
    } else {
      req.flash('errorMsg', fail[1])
      return res.redirect('/')
    }
  },

  new: (req, res) => {
    if (res.locals.username) {
      res.render('prize/new')
    } else {
      req.flash('errorMsg', fail[1])
      return res.redirect('/')
    }
  },

  handleNew: async(req, res, next) => {
    const { image, name, rate, amount, description } = req.body
    if (!image || !name || !rate || !amount || !description) {
      req.flash('errorMsg', fail[2])
      return next()
    }

    try {
      const newPrize = await Prize.create({
        image,
        name,
        rate,
        amount,
        description
      })

      if (newPrize) {
        req.flash('successMsg', success[3])
        return res.redirect('/backstage/prize')
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return res.redirect('/backstage')
    }
  },

  edit: async(req, res, next) => {
    if (res.locals.username) {
      try {
        const prize = await Prize.findOne({
          where: {
            id: req.params.id
          }
        })
        if (prize) {
          res.render('prize/edit', {
            prize
          })
        }
      } catch (err) {
        req.flash('errorMsg', err.toString())
        return next()
      }
    } else {
      req.flash('errorMsg', fail[1])
      return res.redirect('/')
    }
  },

  handleUpdate: async(req, res, next) => {
    const { image, name, rate, amount, description, id } = req.body
    if (!image || !name || !rate || !amount || !description) {
      req.flash('errorMsg', fail[2])
      return next()
    }
    if (id !== req.params.id) {
      req.flash('errorMsg', fail[3])
      return next()
    }

    try {
      const prize = await Prize.findOne({
        where: {
          id
        }
      })
      if (prize) {
        await prize.update({
          image,
          name,
          rate,
          amount,
          description
        })
        req.flash('successMsg', success[2])
        return res.redirect('/backstage/prize')
      } else {
        req.flash('errorMsg', fail[3])
        return next()
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return res.redirect('/backstage')
    }
  },

  handleDelete: async(req, res, next) => {
    if (res.locals.username) {
      try {
        const prize = await Prize.findOne({
          where: {
            id: req.params.id
          }
        })

        if (prize) {
          await prize.destroy()
          req.flash('successMsg', success[2])
          return res.redirect('/backstage/prize')
        }
      } catch (err) {
        req.flash('errorMsg', fail[3])
        return res.redirect('/backstage/prize')
      }
    } else {
      req.flash('errorMsg', fail[1])
      return next()
    }
  }
}

module.exports = prizeControllers
