const request = require('request')
const process = require('process')

const callback = (err, res, body) => {
  const datas = JSON.parse(body)
  if (datas.length) {
    for (const { id, name } of datas) {
      console.log(id, name)
    }
  } else {
    const { id, name } = datas
    console.log(id, name)
  }
}

if (process.argv.length === 4) {
  const action = process.argv[2]
  const modify = process.argv[3]
  if (action === 'read') {
    request(`https://lidemy-book-store.herokuapp.com/books/${modify}`, callback)
  } else if (action === 'delete') {
    request.del(`https://lidemy-book-store.herokuapp.com/books/${modify}`, (err, res, body) => {
      console.log('id:', modify, 'deleted')
    })
  } else if (action === 'create') {
    request.post('https://lidemy-book-store.herokuapp.com/books',
      { form: { name: modify } },
      callback
    )
  }
} else if (process.argv[2] === 'list' && process.argv.length === 3) {
  // 根據題意，因為是指定列出前20本書而非全部的書，因此加上 query-string 限定在20本
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20', callback)
} else if (process.argv[2] === 'update' && process.argv.length === 5) {
  const modify = process.argv[3]
  const newName = process.argv[4]
  /* eslint-disable-next-line */
  request.patch(`https://lidemy-book-store.herokuapp.com/books/${modify}`,
    { form: { name: newName } },
    callback
  )
}
