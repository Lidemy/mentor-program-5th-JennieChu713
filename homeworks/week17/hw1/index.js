const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const PORT = process.env.PORT || 3000

// controllers
const userController = require('./controllers/user')
const categoryController = require('./controllers/category')
const postController = require('./controllers/post')

// view engine & static setting
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// extends middlewares setting
app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
  secret: 'solly',
  resave: false,
  saveUninitialized: true
}))
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.userId = req.session.userId
  res.locals.errorMsg = req.flash('errorMsg')
  res.locals.successMsg = req.flash('successMsg')
  next()
})

// next handle function
function redirectBack(req, res, next) {
  res.redirect('back')
}

// ROUTES
// home page|posts page
app.get('/', postController.index)

app.get('/posts', postController.index)
app.get('/posts/new', postController.new)
app.post('/posts/new', postController.handleCreate, redirectBack)
app.get('/posts/:id', postController.post, redirectBack)
app.get('/posts/:id/edit', postController.edit, redirectBack)
app.post('/posts/:id/edit', postController.handleUpdate, redirectBack)
app.get('/posts/:id/delete', postController.handleDelete, redirectBack)

// login
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.handleLogout)

// about
app.get('/about', userController.about)
app.get('/about/edit', userController.edit, redirectBack)
app.post('/about/edit', userController.handleUpdate, redirectBack)

// category
app.get('/category', categoryController.index)
app.get('/category/new', categoryController.new, redirectBack)
app.post('/category/new', categoryController.handleCreate, redirectBack)
app.get('/category/:id/edit', categoryController.edit, redirectBack)
app.post('/category/:id/edit', categoryController.handleUpdate, redirectBack)
app.get('/category/:id/delete', categoryController.handleDelete, redirectBack)
app.get('/category/:id/posts', categoryController.relatePosts, redirectBack)

// admin
app.get('/admin', userController.admin, redirectBack)

// port connection
app.listen(PORT, () => {
  console.log(`LISTEN ON PORT: ${PORT}`)
})
