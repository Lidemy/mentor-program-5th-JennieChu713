// functions
const addNotTodo = (content) => {
  const showList = document.querySelector('.show-not-todo')
  const wrap = document.createElement('div')
  wrap.classList.add('show-item')
  wrap.innerHTML = `<input type="checkbox" id="item${document.querySelectorAll('.show-not-todo > div').length + 1}"><label for="item${document.querySelectorAll('.show-not-todo > div').length + 1}">${content}</label><button>x</button>`
  // append show-item to show-not-todo
  showList.appendChild(wrap)
}
document.addEventListener('DOMContentLoaded', () => {
  // get input data
  const data = document.querySelector('.add-not-todo > input')
  data.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const addList = data.value
      data.value = ''
      // add input data to list
      if (addList) {
        addNotTodo(addList)
      }
    }
  })
  const showArea = document.querySelector('.show-not-todo')
  showArea.addEventListener('click', (e) => {
    if (e.target.type === 'checkbox') { // crossout item on list
      e.target.nextElementSibling.classList.toggle('crossout')
    }
    if (e.target.type === 'submit') { // delete item from list
      showArea.removeChild(e.target.closest('.show-item'))
    }
  })
})
