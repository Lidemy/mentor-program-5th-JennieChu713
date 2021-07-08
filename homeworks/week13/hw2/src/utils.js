import { getFormTemplate, getCssTemplate } from "./templates"

export function escape(str) {
  return str.replace(/&/g, "&amp;")
   .replace(/</g, "&lt;")
   .replace(/>/g, "&gt;")
   .replace(/"/g, "&quote;")
   .replace(/'/g, "&#039;")
   .replace(/\//g, "&#047;")
}
export function addCommentDOM(container, comment, isAppend) {
  if (!comment["created_at"]) {
    let present = new Date();
    const date = present.toLocaleDateString().replace(/\//g, "-")
    const time = present.toTimeString().slice(0,8)
    comment["created_at"] = `${date} ${time}`
  }
  if (!comment["id"]) {
    comment["id"] = "new!"
  }
  const template = `<div class="card col-lg-6 col-xl-4 mt-3 shadow" data-id="${comment["id"]}">
    <div class="card-body">
      <h5 class="card-title">${comment.id} ${escape(comment["nickname"])}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${comment["created_at"]} - ${escape(comment["site_key"])}</h6>
      <p class="card-text">${escape(comment["comment"])}</p>
    </div>
  </div>`

  if (isAppend) {
    container.append(template)
  } else {
    container.prepend(template)
  }
}

export function appendStyle(containerElement, formClassName, commentsClassName) {
  containerElement.append(getFormTemplate(formClassName, commentsClassName))
  const styleElement = document.createElement("style")
  styleElement.type = "text/css"
  styleElement.appendChild(document.createTextNode(getCssTemplate(formClassName)))
  const formStyle = document.head.appendChild(styleElement)
}
