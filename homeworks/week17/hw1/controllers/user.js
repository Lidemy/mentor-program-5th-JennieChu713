const bcrypt = require('bcrypt')
const db = require('../models')

const { User, Post, Category } = db

const userController = {
  login: (req, res) => {
    res.render('user/login')
  },

  handleLogin: async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMsg', 'All fields required')
      return next()
    }
    try {
      const user = await User.findOne({
        where: {
          username
        }
      })
      if (!user) {
        req.flash('errorMsg', 'Incorrect username or password')
        return next()
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMsg', 'Incorrect username or password')
          return next()
        }
        req.session.username = username
        req.session.userId = user.id
        req.flash('successMsg', `Welcome back, ${user.nickname}`)
        return res.redirect('/')
      })
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return next()
    }
  },

  handleLogout: (req, res) => {
    req.session.username = null
    req.flash('successMsg', 'See you soon')
    res.redirect('/')
  },

  // about controllers
  about: async(req, res) => {
    const username = 'admin'
    try {
      const about = await User.findOne({
        where: {
          username
        }
      })
      if (about) {
        res.render('user/about', {
          about
        })
      }
    } catch (err) {
      req.flash('errorMsg', 'No user exist')
    }
  },

  edit: async(req, res, next) => {
    if (res.locals.username) {
      const { username } = res.locals
      try {
        const about = await User.findOne({
          where: {
            username
          }
        })
        if (about) {
          res.render('user/edit', {
            about
          })
        }
      } catch (err) {
        req.flash('errorMsg', 'No user exist')
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/about')
    }
  },

  handleUpdate: async(req, res, next) => {
    const { nickname, introduction } = req.body
    const { username, userId } = res.locals
    if (!nickname || !introduction) {
      req.flash('errorMsg', 'All fields required')
      return next()
    }

    try {
      const user = await User.findOne({
        where: {
          id: userId,
          username
        }
      })
      if (user) {
        await user.update({
          nickname,
          introduction
        })
        req.flash('successMsg', 'About updated')
        return res.redirect('/about')
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return next()
    }
  },

  // admin
  admin: async(req, res, next) => {
    if (res.locals.username) {
      const { username, userId } = res.locals

      try {
        const user = await User.findOne({
          where: {
            username,
            id: userId
          }
        })
        const categories = await Category.findAll({
          include: Post
        })
        if (user && categories) {
          res.render('admin', {
            user,
            categories
          })
        }
      } catch (err) {
        req.flash('errorMsg', err.toString())
        return next()
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/')
    }
  }
}

module.exports = userController
