// DOM functions
const createStreamCard = () => {
  const div = document.createElement('div')
  div.classList.add('game__card')
  div.classList.add('fussyGlass')
  div.innerHTML = `<div class="game__snapshot"><a target="_blank" rel="noreferrer noopener"><img alt="enter to live stream channel"/></a></div>
  <div class="game__gamer-info">
  <div class="gamer__status">
  <img class="status-avatar" alt="user's avatar"/>
  <div class="status-userid"></div>
  </div>
  <div class="gamer__desc"></div>
  </div>
  </div>`
  document.querySelector('.game__streamList').appendChild(div)
}
const addAttribute = (tag, value, spec = 'text') => {
  if (spec === 'img') {
    tag.setAttribute('src', value)
  } else if (spec === 'a') {
    tag.setAttribute('href', value)
  } else {
    tag.innerText = value
  }
}
const createGameCategory = (game) => {
  const li = document.createElement('li')
  li.innerText = game
  document.querySelector('.category__games').appendChild(li)
}
const streamCardsRefresh = (gameTitle, streamList) => {
  document.getElementsByTagName('h2')[0].innerText = gameTitle

  if (document.querySelector('.game__card')) {
    streamList.innerText = ''
  }
  for (let i = 0; i < 20; i++) {
    createStreamCard()
  }
}
const addStreamCardStreamContent = (streamSelector, url, snapshot) => {
  // add snapshot link and image
  addAttribute(streamSelector.firstElementChild, url, 'a')
  addAttribute(streamSelector.firstElementChild.lastElementChild, snapshot, 'img')
}
const addStreamCardInfoContent = (gamerSelector, avatar, name, status) => {
  // add gamer's avatar, userid and status
  addAttribute(gamerSelector.firstElementChild.firstElementChild, avatar, 'img')
  addAttribute(gamerSelector.firstElementChild.lastElementChild, name)
  addAttribute(gamerSelector.lastElementChild, status)
}

// fetch functions
const getResponse = (res) => {
  if (!res.ok) {
    throw new Error(`ERROR: ${res.status}`)
  }
  return res.json()
}
const getTopGame5 = (data) => {
  const top5 = data.top
  for (const game of top5) {
    const { name } = game.game
    createGameCategory(name)
  }
}
const getLiveStreams20 = (data) => {
  const snapshots = document.querySelectorAll('.game__snapshot')
  const gamerInfos = document.querySelectorAll('.game__gamer-info')
  const { streams } = data
  for (let i = 0; i < streams.length; i++) {
    /* eslint-disable-next-line */
    const { logo, display_name, url, status } = streams[i].channel
    const { medium } = streams[i].preview

    addStreamCardStreamContent(snapshots[i], url, medium)
    /* eslint-disable-next-line */
    addStreamCardInfoContent(gamerInfos[i], logo, display_name, status)
  }
}

const ACCEPT_HEADER = 'application/vnd.twitchtv.v5+json'
const CLIENT_ID = 'tttrhbayjy79uaj9l7763y6rly4evd'
const requiredHeaders = {
  method: 'GET',
  headers: {
    Accept: ACCEPT_HEADER,
    'Client-ID': CLIENT_ID
  }
}
// load the top 5 games
fetch('https://api.twitch.tv/kraken/games/top?limit=5', requiredHeaders)
  .then(getResponse)
  .then(getTopGame5)

// click game for related live streams
document.querySelector('.category__games').addEventListener('click', (e) => {
  const gameTitle = e.target.innerText
  const streamList = document.querySelector('.game__streamList')
  streamCardsRefresh(gameTitle, streamList)

  fetch(`https://api.twitch.tv/kraken/streams/?game=${gameTitle}&limit=20`, requiredHeaders)
    .then(getResponse)
    .then(getLiveStreams20)
})
