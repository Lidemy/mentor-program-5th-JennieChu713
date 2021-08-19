/* eslint-disable */
// ckeditor initialize
if (document.getElementById('editor')) {
  ClassicEditor
    .create(document.querySelector('#editor'))
    .catch(error => {
      console.error(error)
  })
}

// close alert message
if (document.querySelector('.error-msg')) {
  const errorMsg = document.querySelector('.error-msg')
  errorMsg.addEventListener('click', () => {
    errorMsg.style.display = 'none'
  })
}

if (document.querySelector('.success-msg')) {
  const successMsg = document.querySelector('.success-msg')
  successMsg.addEventListener('click', () => {
    successMsg.style.display = 'none'
  })
}

// unescape html content in post
if (document.querySelector('.about__status-post')) {
  const content = document.querySelector('.about__status-post')
  const escapeContent = content.textContent
  content.innerHTML = escapeContent
}
