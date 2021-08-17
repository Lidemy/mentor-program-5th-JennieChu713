const middlewares = {
  redirectBack: (req, res, next) => {
    res.redirect('back')
  },
  success: [
    'Welcome back',
    'Logout successfully',
    'Process success'
  ],
  fail: [
    'Incorrect username or password',
    'No permission',
    'All field(s) required',
    'The item does not exist',
    'Number can not be negative',
    'The sequence order is out of range'
  ]
}

module.exports = middlewares
