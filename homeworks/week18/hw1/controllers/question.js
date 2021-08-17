const { success, fail } = require('./middlewares')
const db = require('../models')

const { Question } = db

const questionControllers = {
  index: async(req, res, next) => {
    try {
      const questions = await Question.findAll({
        order: [
          ['seqOrder', 'ASC']
        ]
      })
      if (questions) {
        res.render('question', {
          questions
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
        const questions = await Question.findAll({
          order: [
            ['seqOrder', 'ASC']
          ]
        })
        if (questions) {
          res.render('question/list', {
            questions
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
      res.render('question/new')
    } else {
      req.flash('errorMsg', fail[1])
      return res.redirect('/')
    }
  },

  handleNew: async(req, res, next) => {
    const { seqOrder, question, answer } = req.body
    if (!seqOrder || !question || !answer) {
      req.flash('errorMsg', fail[2])
      return next()
    }
    if (seqOrder < 0) {
      req.flash('errorMsg', fail[4])
      return res.redirect('/backstage/question')
    }

    const allQuestions = await Question.findAll({
      order: [
        ['seqOrder', 'ASC']
      ]
    })

    if (seqOrder > allQuestions.length) {
      req.flash('errorMsg', fail[5])
      return res.redirect('/backstage/question')
    }

    try {
      const checkSeqOrder = await Question.findOne({
        where: {
          seqOrder
        }
      })

      if (checkSeqOrder) {
        for (const q of allQuestions) {
          if (q.seqOrder >= seqOrder) {
            /* eslint-disable-next-line */
            await q.update({
              seqOrder: q.seqOrder + 1
            })
          }
        }
      }

      const newQuestion = await Question.create({
        seqOrder,
        question,
        answer
      })
      if (newQuestion) {
        req.flash('successMsg', success[3])
        return res.redirect('/backstage/question')
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return res.redirect('/backstage')
    }
  },

  edit: async(req, res, next) => {
    if (res.locals.username) {
      const question = await Question.findOne({
        where: {
          id: req.params.id
        }
      })
      if (question) {
        res.render('question/edit', {
          question
        })
      } else {
        req.flash('errorMsg', fail[3])
        return next()
      }
    } else {
      req.flash('errorMsg', fail[1])
      return res.redirect('/')
    }
  },

  handleUpdate: async(req, res, next) => {
    const { seqOrder, question, answer, id } = req.body
    if (!seqOrder || !question || !answer) {
      req.flash('errorMsg', fail[2])
      return next()
    }
    if (id !== req.params.id) {
      req.flash('errorMsg', fail[3])
      return res.redirect('/backstage/question')
    }
    if (seqOrder < 0) {
      req.flash('errorMsg', fail[4])
      return res.redirect('/backstage/question')
    }

    const allQuestions = await Question.findAll({
      order: [
        ['seqOrder', 'ASC']
      ]
    })

    if (seqOrder > allQuestions.length) {
      req.flash('errorMsg', fail[5])
      return res.redirect('/backstage/question')
    }

    try {
      const switchSeq = await Question.findOne({
        where: {
          seqOrder
        }
      })

      const originSeq = await Question.findOne({
        where: {
          id
        }
      })

      if (switchSeq && originSeq) {
        const former = originSeq.seqOrder
        switchSeq.update({
          seqOrder: former
        })
      }

      const updateQ = await originSeq.update({
        seqOrder,
        question,
        answer
      })
      if (updateQ) {
        req.flash('successMsg', success[2])
        return res.redirect('/backstage/question')
      } else {
        req.flash('errorMsg', fail[3])
        return res.redirect('/backstage/question')
      }
    } catch (err) {
      req.flash('errorMsg', err.toString())
      return res.redirect('/backstage')
    }
  },

  handleDelete: async(req, res, next) => {
    if (res.locals.username) {
      try {
        const question = await Question.findOne({
          where: {
            id: req.params.id
          }
        })

        const allQuestions = await Question.findAll({
          order: [
            ['seqOrder', 'ASC']
          ]
        })

        if (question && allQuestions) {
          for (const q of allQuestions) {
            if (q.seqOrder > question.seqOrder) {
              /* eslint-disable-next-line */
              await q.update({
                seqOrder: q.seqOrder - 1
              })
            }
          }
          await question.destroy()
          req.flash('successMsg', success[2])
          return res.redirect('/backstage/question')
        }
      } catch (err) {
        req.flash('errorMsg', fail[3])
        return res.redirect('/backstage/question')
      }
    } else {
      req.flash('errorMsg', fail[1])
      return next()
    }
  }
}

module.exports = questionControllers
