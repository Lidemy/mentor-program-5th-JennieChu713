const { success, fail } = require('./middlewares')
const db = require('../models')

const { Menu } = db

const menuControllers = {
  index: async(req, res, next) => {
    try {
      const cuisines = await Menu.findAll({
        where: {
          isDeleted: 0
        }
      })
      if (cuisines) {
        res.render('menu', {
          cuisines
        })
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return next()
    }
  },

  // backstage
  listout: async(req, res, next) => {
    if (res.locals.username) {
      try {
        const cuisines = await Menu.findAll({
          where: {
            isDeleted: false
          }
        })
        if (cuisines) {
          res.render('menu/list', {
            cuisines
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
      res.render('menu/new')
    } else {
      req.flash('errorMsg', fail[1])
      return res.redirect('/')
    }
  },

  handleNew: async(req, res, next) => {
    const { image, name, price } = req.body
    if (!image || !name || !price) {
      req.flash('errorMsg', fail[2])
      return next()
    }

    try {
      const newMenu = await Menu.create({
        image,
        name,
        price,
        isDeleted: false
      })

      if (newMenu) {
        req.flash('successMsg', success[3])
        return res.redirect('/backstage/menu')
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return res.redirect('/backstage')
    }
  },

  edit: async(req, res, next) => {
    if (res.locals.username) {
      const menu = await Menu.findOne({
        where: {
          id: req.params.id
        }
      })
      if (menu) {
        res.render('menu/edit', {
          menu
        })
      } else {
        req.flash('errorMsg', fail[3])
      }
    } else {
      req.flash('errorMsg', fail[1])
      return res.redirect('/')
    }
  },

  handleUpdate: async(req, res, next) => {
    const { image, name, price, id } = req.body
    if (!image || !name || !price) {
      req.flash('errorMsg', fail[2])
      return next()
    }
    if (id !== req.params.id) {
      req.flash('errorMsg', fail[3])
      return next()
    }

    try {
      const menu = await Menu.findOne({
        where: {
          id
        }
      })
      if (menu) {
        await menu.update({
          image,
          name,
          price
        })
        req.flash('successMsg', success[2])
        return res.redirect('/backstage/menu')
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
        const menu = await Menu.findOne({
          where: {
            id: req.params.id
          }
        })

        if (menu) {
          await menu.update({
            isDeleted: true
          })
          req.flash('successMsg', success[2])
          return res.redirect('/backstage/menu')
        }
      } catch (err) {
        req.flash('errorMsg', fail[3])
        return res.redirect('/backstage/menu')
      }
    } else {
      req.flash('errorMsg', fail[1])
      return next()
    }
  }
}

module.exports = menuControllers
