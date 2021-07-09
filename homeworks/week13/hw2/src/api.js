import $ from "jquery"

export function getComments(apiUrl, siteKey, before, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`
  if (before) {
    url += "&before=" + before
  }
  $.ajax({
    url,
    success: function(data) {
      cb(data)
      },
    error: function(err) {
      console.log(err)
    }
  })
}

export function addComment(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: "POST",
    url: `${apiUrl}/api_add_comment.php`,
    data
  }).done(
    (data) => {
      cb(data)
    }
  ).fail(
    (err) => {
      console.log(err)
    }
  )
}
