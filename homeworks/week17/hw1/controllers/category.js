const db = require('../models')

const { Post, Category } = db

const categoryController = {
  index: async(req, res) => {
    try {
      const categories = await Category.findAll({
        include: Post
      })
      if (categories) {
        res.render('category', {
          categories
        })
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return res.redirect('/')
    }
  },

  new: (req, res, next) => {
    if (res.locals.username) {
      res.render('category/new')
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/category')
    }
  },

  handleCreate: async(req, res, next) => {
    if (res.locals.username) {
      const { categoryName } = req.body
      if (!categoryName) {
        req.flash('errorMsg', 'Field required')
        return next()
      }

      try {
        const category = await Category.create({
          categoryName,
          isDefault: false
        })
        if (category) {
          req.flash('successMsg', 'New category created')
          return res.redirect('/category')
        }
      } catch (err) {
        req.flash('errorMsg', err.toString())
        return next()
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/category')
    }
  },

  edit: async(req, res, next) => {
    if (res.locals.username) {
      const { id } = req.params

      try {
        const category = await Category.findOne({
          where: {
            id
          }
        })
        if (category) {
          res.render('category/edit', {
            category
          })
        }
      } catch (err) {
        req.flash('errorMsg', 'No category exist')
        return next()
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/category')
    }
  },

  handleUpdate: async(req, res, next) => {
    const { id, categoryName } = req.body
    if (!categoryName) {
      req.flash('errorMsg', 'Field required')
      return next()
    }

    try {
      const category = await Category.findOne({
        where: {
          id
        }
      })
      if (category) {
        await category.update({
          categoryName
        })
        req.flash('successMsg', 'Category updated')
        return res.redirect('/category')
      }
    } catch (err) {
      req.flash('errorMsg', 'Category does not exist')
      return next()
    }
  },

  handleDelete: async(req, res, next) => {
    if (res.locals.username) {
      const { id } = req.params
      try {
        const category = await Category.findOne({
          where: {
            id
          },
          include: Post
        })
        if (category) {
          if (category.isDefault) {
            req.flash('errorMsg', 'Default value cant not be delete')
            return res.redirect('/category')
          }
          for (const post of category.Posts) {
            /* eslint-disable-next-line */
            await post.update({
              CategoryId: 1
            })
          }
          await category.destroy()
          req.flash('successMsg', 'Category deleted')
          return res.redirect('/category')
        }
      } catch (err) {
        req.flash('errorMsg', 'Category does not exist')
        return next()
      }
    } else {
      req.flash('errorMsg', 'No permission')
      return res.redirect('/category')
    }
  },

  relatePosts: async(req, res, next) => {
    const { id } = req.params
    const { userId } = res.locals

    try {
      const posts = await Category.findOne({
        where: {
          id,
          UserId: userId
        },
        include: Post
      })
      if (posts) {
        res.render('category/posts', {
          posts
        })
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return next()
    }
  }
}

module.exports = categoryController
