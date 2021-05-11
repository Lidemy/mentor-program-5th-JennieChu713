const request = require('request')
const process = require('process')

const nameContain = process.argv[2]

request(`https://restcountries.eu/rest/v2/name/${nameContain}`, (err, res, body) => {
  const lists = JSON.parse(body)
  for (let i = 0; i < lists.length; i++) {
    /* eslint-disable-next-line */
    let { name, capital, callingCodes, currencies } = lists[i]
    callingCodes = callingCodes.join('')
    currencies = currencies[0].code
    console.log('============')
    console.log(`國家：${name}\n首都：${capital}\n貨幣：${currencies}\n國碼：${callingCodes}`)
  }
  if (lists.status === 404) {
    console.log('找不到國家資訊')
  }
})
