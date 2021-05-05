const request = require('request')
const process = require('process')

if (process.argv.length === 4) {
  const action = process.argv[2]
  const modify = process.argv[3]
  if (action === 'read') {
    request(`https://lidemy-book-store.herokuapp.com/books/${modify}`, (err, res, body) => {
      const { id, name } = JSON.parse(body)
      console.log(id, name)
    })
  } else if (action === 'delete') {
    request.del(`https://lidemy-book-store.herokuapp.com/books/${modify}`, (err, res, body) => {
      console.log('id:', modify, 'deleted')
    })
  } else if (action === 'create') {
    request.post('https://lidemy-book-store.herokuapp.com/books',
      { form: { name: modify } },
      (err, res, body) => {
        const { id, name } = JSON.parse(body)
        console.log('created: ', id, name)
      }
    )
  }
} else if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20', (err, res, body) => {
    for (const { id, name } of JSON.parse(body)) {
      console.log(id, name)
    }
  })
} else if (process.argv[2] === 'update') {
  const modify = process.argv[3]
  const newName = process.argv[4]
  /* eslint-disable-next-line */
  request.patch(`https://lidemy-book-store.herokuapp.com/books/${modify}`,
    { form: { name: newName } },
    (err, res, body) => {
      const { name } = JSON.parse(body)
      console.log('updated ', name)
    }
  )
}
