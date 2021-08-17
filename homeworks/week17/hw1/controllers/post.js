const db = require('../models')

const { Post, Category } = db

const postController = {
  index: async(req, res) => {
    try {
      const posts = await Post.findAll({
        include: Category
      })
      if (posts) {
        res.render('index', {
          posts
        })
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return res.redirect('/')
    }
  },

  new: async(req, res, next) => {
    if (res.locals.username) {
      try {
        const categories = await Category.findAll()
        if (categories) {
          res.render('post/new', {
            categories
          })
        }
      } catch (err) {
        req.flash('errorMsg', err.toString())
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/')
    }
  },

  handleCreate: async(req, res, next) => {
    const { userId } = res.locals
    const { title, categoryId, content } = req.body
    if (!title || !categoryId || !content) {
      req.flash('errorMsg', 'All fields required')
      return next()
    }

    try {
      const post = await Post.create({
        title,
        content,
        UserId: userId,
        CategoryId: categoryId
      })
      if (post) {
        req.flash('successMsg', 'New post created')
        return res.redirect('/')
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return next()
    }
  },

  post: async(req, res, next) => {
    const { id } = req.params
    try {
      const post = await Post.findOne({
        where: {
          id
        },
        include: Category
      })
      if (post) {
        res.render('post', {
          post
        })
      }
    } catch (err) {
      req.flash('errorMsg', 'Post does not exist')
      return next()
    }
  },

  edit: async(req, res, next) => {
    if (res.locals.username) {
      const { id } = req.params
      try {
        const post = await Post.findOne({
          where: {
            id
          },
          include: Category
        })
        const categories = await Category.findAll()
        if (post && categories) {
          res.render('post/edit', {
            post,
            categories
          })
        }
      } catch (err) {
        req.flash('errorMsg', 'Post does not exist')
        return next()
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/')
    }
  },

  handleUpdate: async(req, res, next) => {
    const { userId } = res.locals
    const { title, categoryId, content, id } = req.body

    if (!title || !categoryId || !content) {
      req.flash('errorMsg', 'All fields required')
      return next()
    }

    if (id !== req.params.id) {
      req.flash('errorMsg', 'All fields required')
      return res.redirect('/posts')
    }

    try {
      const post = await Post.findOne({
        where: {
          id,
          UserId: userId
        }
      })
      if (post) {
        await post.update({
          title,
          CategoryId: categoryId,
          content
        })
        req.flash('successMsg', 'Post updated')
        return res.redirect(`/posts/${id}`)
      }
    } catch (err) {
      req.flash('errorMsg', 'Post does not exist')
      return res.redirect('/posts')
    }
  },

  handleDelete: async(req, res, next) => {
    if (res.locals.username) {
      const { userId } = res.locals
      const { id } = req.params

      try {
        const post = await Post.findOne({
          where: {
            id,
            UserId: userId
          }
        })
        if (post) {
          await post.destroy()
          req.flash('successMsg', 'Post deleted')
          return res.redirect('/')
        }
      } catch (err) {
        req.flash('errorMsg', 'Post does not exist')
        return next()
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/')
    }
  }
}

module.exports = postController
