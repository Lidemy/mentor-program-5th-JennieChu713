const reviewers = {
  names: ['國父桑', '可達鴨', '旅かえる旅行青蛙'],
  comments: [
    '我一生疲於建國，去過日本，去過歐洲，卻從未到過台北101，也從來沒有吃過這麼好吃的東西...今天在時空旅行者的幫助下我終於吃到了...此生再無遺憾 QAQ!!',
    '三雙鞋等於30，兩個人加一雙鞋等於20，一雙冰淇淋加一雙冰淇淋加一個人等於13，那$#%$#%^%$^##$%等於多少...唉，大概咬一口就知道了!!',
    '自從呱呱呱呱呱以後，我呱呱呱呱呱，非常感謝呱呱呱呱呱，下次呱呱呱呱呱我呱呱呱呱呱，一定呱呱呱呱呱!!!'
  ]
}

// render index reviews
if (document.querySelector('.assess__cards')) {
  const cards = document.querySelector('.assess__cards')

  for (let i = 0; i < reviewers.comments.length; i++) {
    const article = document.createElement('article')
    article.classList.add('cards__card')
    article.innerHTML = `<div class="card__user-avatar"><img src="img/p-${i + 1}.png" alt=""></div>
    <div class="card__username">${reviewers.names[i]}</div>
    <div class="card__comment container">${reviewers.comments[i]}</div>`
    cards.appendChild(article)
  }
}

// render index cuisine
if (document.querySelector('.menu__looks')) {
  const looks = document.querySelector('.menu__looks')
  for (let i = 0; i < 4; i++) {
    const div = document.createElement('div')
    div.classList.add('looks__pic')
    div.innerHTML = `<img src="./img/f-00${i + 1}.png" alt="">`
    looks.appendChild(div)
  }
}

// render menu popular soldout cuisine
if (document.querySelector('.popular__looks')) {
  const popular = document.querySelector('.popular__looks')
  for (let i = 0; i < 3; i++) {
    const div = document.createElement('div')
    div.classList.add('looks__pic')
    div.innerHTML = `<div class="looks__outstock">售完</div>
    <img src="img/ad-0${i + 1}.png" alt="">`
    popular.appendChild(div)
  }
}

// close alert message
if (document.querySelector('.error-msg')) {
  const msg = document.querySelector('.error-msg')
  msg.addEventListener('click', () => {
    msg.style.display = 'none'
  })
}

if (document.querySelector('.success-msg')) {
  const msg = document.querySelector('.success-msg')
  msg.addEventListener('click', () => {
    msg.style.display = 'none'
  })
}

// hide show QnA answer
if (document.querySelector('.question__list')) {
  const fatherContent = document.querySelector('.question__list')

  fatherContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('qna__content')) {
      e.target.lastElementChild.classList.toggle('hide')
    }
    if (e.target.classList.contains('content__question')) {
      e.target.nextElementSibling.classList.toggle('hide')
    }
    if (e.target.classList.contains('content__answer')) {
      e.target.classList.toggle('hide')
    }
    if (e.target.classList.contains('list__qna')) {
      e.target.lastElementChild.lastElementChild.classList.toggle('hide')
    }
  })
}
