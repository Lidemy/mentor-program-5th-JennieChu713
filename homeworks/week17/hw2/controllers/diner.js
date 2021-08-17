const bcrypt = require('bcrypt')
const db = require('../models')
const { fail, success } = require('./middlewares')

const { User } = db

const dinerControllers = {
  index: (req, res) => {
    res.render('index')
  },

  login: (req, res) => {
    res.render('admin/login')
  },

  handleLogin: async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMsg', fail[2])
      return next()
    }
    try {
      const user = await User.findOne({
        where: {
          username
        }
      })
      if (user) {
        bcrypt.compare(password, user.password, (err, isSuccess) => {
          if (err || !isSuccess) {
            req.flash('errorMsg', 'Incorrect username or password')
            return next()
          } else {
            req.session.username = user.username
            req.flash('successMsg', success[0])
            return res.redirect('/backstage')
          }
        })
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return next()
    }
  },

  handleLogout: (req, res) => {
    req.session.username = null
    req.flash('successMsg', success[1])
    return res.redirect('/')
  },

  backStage: (req, res, next) => {
    if (res.locals.username) {
      return res.render('admin')
    }
    req.flash('errorMsg', fail[1])
    return next()
  },

  // only for keeping record
  handleRegister: async(req, res, next) => {
    const { username, password, address, phone, openHours, email } = req.body
    if (!username || !password || !address || !phone || !openHours || !email) {
      req.flash('errorMsg', 'All field(s) required')
      return next()
    }
    const addSalt = 10
    bcrypt.hash(password, addSalt, (err, hashed) => {
      const user = User.create({
        username,
        password: hashed,
        address,
        phone,
        openHours,
        email
      })
      if (user) {
        req.session.username = username
        req.flash('successMsg', 'register success')
        return res.redirect('/backstage')
      }
      if (err) {
        req.flash('errorMsg', err.toString())
        return next()
      }
    })
  }
}

module.exports = dinerControllers
