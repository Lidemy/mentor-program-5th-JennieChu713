// functions
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
// load the top 5 games
const request = new XMLHttpRequest()
request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true)
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
request.setRequestHeader('Client-ID', 'tttrhbayjy79uaj9l7763y6rly4evd')
request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    const top5 = JSON.parse(request.responseText).top
    for (const info of top5) {
      const li = document.createElement('li')
      li.innerText = info.game.name
      document.querySelector('.catagory__games').appendChild(li)
    }
  } else {
    console.error()
  }
}
request.onerror = function() {
  console.error()
}
request.send()

// click game for related live streams
document.querySelector('.catagory__games').addEventListener('click', (e) => {
  // present selected game title
  const gameTitle = e.target.innerText
  document.getElementsByTagName('h2')[0].innerText = gameTitle
  // clearout exist streamcards
  const streamList = document.querySelector('.game__streamList')
  if (document.querySelector('.game__card')) {
    streamList.innerText = ''
  }
  for (let i = 0; i < 20; i++) {
    createStreamCard()
  }
  const request = new XMLHttpRequest()
  request.open('GET', `https://api.twitch.tv/kraken/streams/?game=${gameTitle}&limit=20`, true)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.setRequestHeader('Client-ID', 'tttrhbayjy79uaj9l7763y6rly4evd')
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const snapshots = document.querySelectorAll('.game__snapshot')
      const gamerInfos = document.querySelectorAll('.game__gamer-info')
      const liveStreams20 = JSON.parse(request.responseText).streams
      for (let i = 0; i < liveStreams20.length; i++) {
        /* eslint-disable-next-line camelcase */
        const { logo, display_name, url, status } = liveStreams20[i].channel
        const { medium } = liveStreams20[i].preview
        // add snapshot link and image
        addAttribute(snapshots[i].firstElementChild, url, 'a')
        addAttribute(snapshots[i].firstElementChild.lastElementChild, medium, 'img')
        // add gamer's avatar, userid and status
        addAttribute(gamerInfos[i].firstElementChild.firstElementChild, logo, 'img')
        addAttribute(gamerInfos[i].firstElementChild.lastElementChild, display_name)
        addAttribute(gamerInfos[i].lastElementChild, status)
      }
    } else {
      console.error()
    }
  }
  request.onerror = function() {
    console.error()
  }
  request.send()
})
