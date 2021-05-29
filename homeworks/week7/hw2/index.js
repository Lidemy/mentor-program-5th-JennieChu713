document.addEventListener('DOMContentLoaded', () => {
  const questionsNo = document.querySelectorAll('.questions-list-qa > h4')
  for (let i = 0; i < questionsNo.length; i++) {
    questionsNo[i].innerHTML = `<span class="questions-number">Q${i + 1}:</span>${questionsNo[i].innerText}`
  }
  document.querySelector('.faq__questions-list').addEventListener('click', (e) => {
    if (e.target.nodeName === 'H4') {
      e.target.nextElementSibling.classList.toggle('hide')
    }
    if (e.target.classList.contains('questions-list-qa')) {
      e.target.lastElementChild.classList.toggle('hide')
    }
    if (e.target.nodeName === 'P') {
      e.target.classList.add('hide')
    }
  })
})
