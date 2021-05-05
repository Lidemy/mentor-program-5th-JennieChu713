const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    /* eslint-disable-next-line */
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'tttrhbayjy79uaj9l7763y6rly4evd'
  }
}
function callback(err, res, body) {
  if (!err && res.statusCode === 200) {
    const info = JSON.parse(body)
    for (const { game, viewers } of info.top) {
      console.log(viewers, game.name)
    }
  }
}
request(options, callback)
