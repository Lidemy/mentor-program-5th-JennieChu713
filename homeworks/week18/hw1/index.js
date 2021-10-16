const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const PORT = process.env.PORT || 3000

// controllers
const dinerControllers = require('./controllers/diner')
const prizeControllers = require('./controllers/prize')
const menuControllers = require('./controllers/menu')
const questionControllers = require('./controllers/question')

// next middle-ware handler
const { redirectBack } = require('./controllers/middlewares')

// Setting: template engine, public file path and extend middle-wares
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
// body-parser is deprecated since express 4.X already has body-parser built-in:https://hsiangfeng.github.io/nodejs/20210326/2926076225/
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
  secret: 'kinda miserable',
  resave: false,
  saveUninitialized: true
}))

// res.locals
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMsg = req.flash('errorMsg')
  res.locals.successMsg = req.flash('successMsg')
  next()
})

// page routes
// FRONT: index root
app.get('/', dinerControllers.index)

// FRONT: prize
app.get('/prize', prizeControllers.index)
app.get('/prize/result', prizeControllers.result, redirectBack)

// FRONT: menu
app.get('/menu', menuControllers.index, redirectBack)

// FRONT: question
app.get('/question', questionControllers.index, redirectBack)

// login
app.get('/login', dinerControllers.login)
app.post('/login', dinerControllers.handleLogin, redirectBack)
app.get('/logout', dinerControllers.handleLogout)
// app.post('/login', dinerControllers.handleRegister, redirectBack)

// BACKSTAGE: index
app.get('/backstage', dinerControllers.backStage, redirectBack)

// BACKSTAGE: prize
app.get('/backstage/prize', prizeControllers.listout, redirectBack)
app.get('/backstage/prize/new', prizeControllers.new)
app.post('/backstage/prize/new', prizeControllers.handleNew, redirectBack)
app.get('/backstage/prize/:id/edit', prizeControllers.edit, redirectBack)
app.post('/backstage/prize/:id/edit', prizeControllers.handleUpdate, redirectBack)
app.get('/backstage/prize/:id/delete', prizeControllers.handleDelete, redirectBack)

// BACKSTAGE: menu
app.get('/backstage/menu', menuControllers.listout, redirectBack)
app.get('/backstage/menu/new', menuControllers.new)
app.post('/backstage/menu/new', menuControllers.handleNew, redirectBack)
app.get('/backstage/menu/:id/edit', menuControllers.edit, redirectBack)
app.post('/backstage/menu/:id/edit', menuControllers.handleUpdate, redirectBack)
app.get('/backstage/menu/:id/delete', menuControllers.handleDelete, redirectBack)

// BACKSTAGE: question
app.get('/backstage/question', questionControllers.listout, redirectBack)
app.get('/backstage/question/new', questionControllers.new)
app.post('/backstage/question/new', questionControllers.handleNew, redirectBack)
app.get('/backstage/question/:id/edit', questionControllers.edit, redirectBack)
app.post('/backstage/question/:id/edit', questionControllers.handleUpdate, redirectBack)
app.get('/backstage/question/:id/delete', questionControllers.handleDelete, redirectBack)

// PORT connection
app.listen(PORT, () => {
  console.log(`Listen on port:${PORT}`)
})
