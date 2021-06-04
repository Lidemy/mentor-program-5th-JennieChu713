// JS handling functions
const prizeMessage = (prize) => {
  const showPrizeBackground = document.querySelector('.background')
  const button = document.querySelector('.lottery-btn')
  const h3 = document.createElement('h3')
  if (typeof prize === 'object') {
    const [desc, img] = prize
    showPrizeBackground.style.background = `url(${img}) center/cover no-repeat`
    h3.innerText = desc
    h3.classList.add('prize')
  } else {
    h3.innerText = prize
    h3.classList.add('thank')
    showPrizeBackground.style.background = '#2b2b2b'
  }
  button.style.width = '300px'
  button.style.transition = 'none'
  const lotteryInfo = document.querySelector('.lottery__section')
  lotteryInfo.classList.remove('display')
  lotteryInfo.insertBefore(h3, button)
}
const prizesPresent = {
  FIRST: ['恭喜你中頭獎了！日本東京來回雙人遊！', 'https://cdn.pixabay.com/photo/2019/07/04/06/35/flight-4315953_1280.jpg'],
  SECOND: ['二獎！90 吋電視一台！', 'https://cdn.pixabay.com/photo/2016/11/30/08/46/living-room-1872192_1280.jpg'],
  THIRD: ['恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！', 'https://cdn.pixabay.com/photo/2017/08/10/03/00/youtube-2617510_1280.jpg'],
  NONE: '銘謝惠顧'
}
// JS render
const lotteryBtn = document.querySelector('.lottery-btn')
lotteryBtn.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const { prize } = JSON.parse(request.responseText)
      if (!document.getElementsByTagName('h3').length) {
        if (prizesPresent[prize]) {
          const prizeInfo = prizesPresent[prize]
          document.querySelector('.lottery__info').style.display = 'none'
          prizeMessage(prizeInfo)
        }
      } else {
        alert('您已經抽過獎了')
      }
    } else {
      alert('系統不穩定，請再試一次')
    }
  }
  request.onerror = function() {
    console.log('error')
  }
  request.send()
})
