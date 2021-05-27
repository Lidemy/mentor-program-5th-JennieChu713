// handle functions
const applyMessage = (id, content) => {
  let message
  if (id !== 'type') {
    message = document.querySelector(`.filling-${id} > p:last-of-type`)
  } else {
    message = document.querySelector(`.filling-${id} label + p`)
  }
  if (!(message)) {
    const p = document.createElement('p')
    p.textContent = content
    const fillingArea = document.getElementsByClassName(`filling-${id}`)[0]
    fillingArea.appendChild(p).className = 'warning'
  } else {
    message.textContent = content
  }
}
const preventWarning = (filling) => {
  if (!(filling.value) && filling.id !== 'others') { // blank checking
    return applyMessage(filling.id, '此欄位不可空白！')
  }
  if (filling.id === 'email') { // email format checking
    const reg = /[\w]+@[\w]+\.com/giu
    if (!(filling.value.match(reg))) {
      return applyMessage(filling.id, 'email 格式不符！')
    }
  }
  if (filling.id === 'phone') { // phone format checking
    const reg = /^[0-9]{10}$/giu
    if (!(filling.value.match(reg))) {
      return applyMessage(filling.id, '號碼格式不符！')
    }
  }
  return 'ok'
}
const removeMessage = (id) => {
  const message = document.querySelector(`.filling-${id}`)
  let warningMessage = document.querySelector(`.filling-${id} > p:last-of-type`)
  if (id !== 'type' && warningMessage) {
    message.removeChild(warningMessage)
  } else {
    warningMessage = document.querySelector(`.filling-${id} > label + p`)
    if (warningMessage) {
      message.removeChild(warningMessage)
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.form__filling').addEventListener('submit', (e) => {
    const inputs = document.querySelectorAll('input[type="text"]')
    const choice = document.querySelector('input:checked')
    if (!(choice)) {
      e.preventDefault()
      applyMessage('type', '此選項不可空白！')
    } else {
      removeMessage('type')
    }
    const values = {}
    for (const input of inputs) {
      if (preventWarning(input) !== 'ok') {
        e.preventDefault()
      }
      if (preventWarning(input) === 'ok' && input.value !== '') {
        values[input.id] = input.value
        removeMessage(input.id)
      }
    }
    if (values.email && values.phone) {
      if (Object.values(values).length >= 4 && choice) {
        const { name, email, phone, info, others } = values
        const content = `感謝報名！以下是您所填寫的資料：\n暱稱：${name}\n電子郵件：${email}\n手機號碼：${phone}\n報名類型：${choice.value}\n活動得知辦法：${info}\n其他：${others}`
        alert(content)
      }
    }
  })
})
