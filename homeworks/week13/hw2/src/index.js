import { getComments, addComment } from "./api"
import { addCommentDOM, appendStyle } from "./utils"
import { getCssTemplate, getFormTemplate, getLoadMoreBtn } from "./templates"
import $ from "jquery"

export function init(options) {
  // loadmore btn detect values
  let lastId = null
  let isEnd = false

  // variable assign
  let siteKey = options.siteKey
  let apiUrl = options.apiUrl
  let containerElement = $(options.containerSelector)

  let loadMoreClassName = `${siteKey}-loading-btn`
  let commentsClassName = `${siteKey}-comments__list`
  let formClassName = `${siteKey}-comment__form-area`

  appendStyle(containerElement, formClassName, commentsClassName)

  const commentsSelector = "." + commentsClassName
  const formSelector = "." + formClassName

  const commentsList = $(commentsSelector)
  // render comments
  getNewComments()

  // load more comment
  commentsList.on("click", `.${loadMoreClassName}`, () => {
    getNewComments()
  })

  // add comment
  $(formSelector).submit((e) => {
    e.preventDefault()
    const nicknameDOM = $(`${formSelector} input[name=nickname]`)
    const commentDOM = $(`${formSelector} textarea[name=comment]`)

    const newComment = {
      site_key: siteKey,
      nickname: nicknameDOM.val(),
      comment: commentDOM.val()
    }
    addComment(apiUrl, siteKey, newComment, data => {
      if (!data.ok) {
        return alert(data.message)
      }
      // clear out  fields
      nicknameDOM.val('')
      commentDOM.val('')
      addCommentDOM(commentsList, newComment)
    })
  })

  // function for render
  function getNewComments() {
    const commentsList = $(commentsSelector)
    getComments(apiUrl, siteKey, lastId, data => {
      if (!data.ok) {
        alert(data.message)
        return
      }
      const comments = data.comments
      for (let comment of comments) {
        addCommentDOM(commentsList, comment, true)
      }
      let len = comments.length
      if ( len === 0 || len < 5) {
        isEnd = true
        $(`.${loadMoreClassName}`).hide()
      } else {
        lastId = comments[len - 1].id
        const loadMoreBtnHTML = getLoadMoreBtn(loadMoreClassName)
        commentsList.append(loadMoreBtnHTML)
      }
    })
  }
}
