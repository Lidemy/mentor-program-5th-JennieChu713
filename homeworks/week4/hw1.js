const request = require('request')

request('https://lidemy-book-store.herokuapp.com/books?_limit=10', (err, res, body) => {
  const top10 = JSON.parse(body)
  for (const { id, name } of top10) {
    console.log(id, name)
  }
})
