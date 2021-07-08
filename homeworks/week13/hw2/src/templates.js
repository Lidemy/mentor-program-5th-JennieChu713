export function getLoadMoreBtn(className) {
  return `<div class="row ${className}">
  <button class="btn btn-outline-info col-4 mx-auto my-4">Load More</button>
  </div>`
}

export function getFormTemplate(className, commentsClassName) {
  return `
  <div>
    <div class="row my-3">
      <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6 mx-auto">
        <form class="${className} rounded-3 shadow-sm px-5 py-3">
          <h2 class="mb-4">Comment</h2>
          <div class="form-floating mb-3">
            <input name="nickname" type="text" class="form-control">
            <label>Nickname</label>
          </div>
          <div class="form-floating mb-3">
            <textarea name="comment" class="form-control" placeholder="Leave a comment here"></textarea>
            <label>Comment</label>
          </div>
          <div class="d-grid grid-2 col-6 mx-auto">
            <button type="submit" class="btn btn-outline-secondary rounded-pill my-4">Send</button>
          </div>
        </form>
      </div>
    </div>
    <div class="row ${commentsClassName} mt-5 mb-4">
      <!-- comments render -->
    </div>
  </div>`
}

export function getCssTemplate(className) {
  return `.${className} {
    background: #E8CBC0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, rgba(99, 111, 164, .3), rgba(232, 203, 192, .3));  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, rgba(99, 111, 164, .3), rgba(232, 203, 192, .3)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }`
}
