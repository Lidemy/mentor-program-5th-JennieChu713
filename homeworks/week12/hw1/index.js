/* eslint-disable */
// functions for render
const escape = (str) => {
  return str.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quote;")
    .replace(/'/g, "&#039;")
    .replace(/\//g, "&#047;")
}
const addCommentDOM = (container, comment, isAppend) => {
  if (!comment.created_at) {
    const present = new Date()
    const date = present.toLocaleDateString().replace(/\//g, "-")
    const time = present.toTimeString().slice(0, 8)
    comment.created_at = `${date} ${time}`
  }
  const template = `<div class="card col-lg-6 col-xl-4 mt-3 shadow" data-id="${comment.id}">
    <div class="card-body">
      <h5 class="card-title">${escape(comment.nickname)}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${comment.created_at} - ${escape(comment.site_key)}</h6>
      <p class="card-text">${escape(comment.comment)}</p>
    </div>
  </div>`

  if (isAppend) {
    container.append(template)
  } else {
    container.prepend(template)
  }
}

// DOMConetentLoaded
$(document).ready(() => {
  const commentsList = $(".comments__list")

  // render comments
  $.ajax({
    url: "http://mentor-program.co/mtr04group6/jen713/week12/hw1/api_comments.php?site_key=postmantest",
    success: function(data) {
      if (!data.ok) {
        return alert(data.message)
      }
      const { comments } = data
      for (const comment of comments) {
        addCommentDOM(commentsList, comment, true)
      }

      // as comments reach to 5, create load button
      if (comments.length === 5) {
        commentsList.after(`<div class="row loading-btn">
        <button class="btn btn-outline-info col-4 mx-auto my-4">Load More</button>
      </div>`)
        // load more comment
        const loadBtn = $(".loading-btn")
        loadBtn.click(() => {
          const id = $(".card:last-child").attr("data-id")
          $.ajax({
            url: "http://mentor-program.co/mtr04group6/jen713/week12/hw1/api_loadmore_comments.php?site_key=postmantest&id=" + encodeURI(id),
            success: function(data) {
              if (!data.ok) {
                return alert(data.message)
              }
              const { comments } = data
              for (const comment of comments) {
                addCommentDOM(commentsList, comment, true)
              }
              if (comments.length < 5) {
                loadBtn.empty()
              }
            },
            error: function(err) {
              console.log(err)
            }
          })
        })
      }
    },
    error: function(err) {
      console.log(err)
    }
  })

  // add comment
  $(".comment__form-area").submit((e) => {
    e.preventDefault()
    const newComment = {
      site_key: "postmantest",
      nickname: $("input[name=nickname]").val(),
      comment: $("textarea[name=comment]").val()
    }
    $.ajax({
      type: "POST",
      url: "http://mentor-program.co/mtr04group6/jen713/week12/hw1/api_add_comment.php",
      data: newComment
    }).done(
      (data) => {
        if (!data.ok) {
          return alert(data.message)
        }
        // clear out  fields
        $("input[name=nickname]").val('')
        $("textarea[name=comment]").val('')
        addCommentDOM(commentsList, newComment)
      }
    ).fail(
      (err) => {
        console.log(err)
      }
    )
  })
})
