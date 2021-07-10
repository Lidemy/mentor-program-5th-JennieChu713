/* eslint-disable */
// functions for DOM render
const escape = (str) => { // 嘗試用之前網路看到的其他寫法看看
  const escapeChar = {
    "&": "&amp;",
    "\"": "&quot;",
    "'": "&#039;",
    "<": "&lt;",
    ">": "&gt;",
    "/": "&#047;"
  }
  return str.replace(/[&"'<>/]/g, (c) => escapeChar[c])
}
const addTodoDOM = (container, content, id) => {
  const template = `<div class="row mb-3 todo-item" data-id="${id}">
  <div class="col-sm-12 col-md-10 col-lg-8 col-xl-6 mx-auto d-flex justify-content-between">
    <div class="form-check d-flex align-items-center">
      <input class="form-check-input me-2" type="checkbox">
      <label class="form-check-label fs-2">
        ${escape(content)}
      </label>
    </div>
    <button class="btn btn-dark">delete</button>
  </div>
  </div>`
  container.append(template)
}
const changeCounts = (total, complete, isReset) => {
  const countsTotal = $(".total-counts")
  const countsIncompleted = $(".incompleted-counts")
  const countsCompleted = $(".completed-counts")

  if (isReset) {
    countsTotal.text(0)
    countsIncompleted.text(0)
    countsCompleted.text(0)
  }
  countsTotal.text(total)
  countsIncompleted.text(total - complete)
  countsCompleted.text(complete)
}
const todoFliter = (container, status) => {
  container.each((i, el) => {
    const crossout = $(el).find("label").hasClass("crossout")

    if (status === "all") {
      $(el).show()
    } else if (status === "clear") {
      if (crossout) {
        $(el).remove()
      }
    } else if (status === "fin") {
      if (crossout) {
        $(el).show()
      } else {
        $(el).hide()
      }
    } else if (status === "undone") {
      if (!crossout) {
        $(el).show()
      } else {
        $(el).hide()
      }
    }
  })
}
// DOMContentLoaded
$(document).ready(() => {
  // todo counters and todo-item id
  let id = 1
  let total = 0
  let complete = 0

  // get input text and render
  const todoList = $(".todos__list")
  $(".todo__add-form").keydown((e) => {
    if (e.keyCode === 13) {
      addTodoDOM(todoList, $("input[name=todo]").val(), id)
      $("input[name=todo]").val('')
      id++
      total++
      changeCounts(total, complete)
    }
  })

  // delete and complete todo
  todoList.click((e) => {
    if (e.target.type === "submit") { // delete
      $(e.target).parent().parent().remove()

      total--
      if (complete) {
        complete--
      }
      changeCounts(total, complete)

      if (total - complete < 0) {
        total = 0
        complete = 0
        changeCounts(total, complete, true)
      }
    }
    if (e.target.type === "checkbox") { // complete crossout
      if (!$(e.target).next().hasClass("crossout")) {
        $(e.target).next().addClass("crossout")

        complete++
        changeCounts(total, complete)
      } else {
        $(e.target).next().removeClass("crossout")
        complete--
        changeCounts(total, complete)
      }
    }
  })

  // edit todo
  todoList.dblclick((e) => {
    if (e.target.tagName === "LABEL") {
      let content = e.target.innerText
      e.target.innerText = ''
      const element = e.target
      $(e.target).replaceWith(`<input class="form-control form-control-lg" type="text" name="editTodo" value="${content}">`)

      const editInput = $("input[name=editTodo]")
      editInput.keydown((e) => {
        if (e.keyCode === 13) {
          content = editInput.val()
          element.innerText = content
          editInput.replaceWith(element)
        }
      })
    }
  })

  // buttons manipulation
  $(".todo__btns").click((e) => {
    if ($(e.target).hasClass("btn-danger")) { // clear all
      todoList.empty()
      total = 0
      complete = 0
      changeCounts(total, complete)
    }

    const todoItem = $(".todo-item")
    if ($(e.target).hasClass("btn-info")) { // clear completed
      todoFliter(todoItem, "clear")
      total -= complete
      complete = 0
      changeCounts(total, complete)
    }
    if ($(e.target).hasClass("btn-success")) { // show complete
      todoFliter(todoItem, "fin")
    }
    if ($(e.target).hasClass("btn-primary")) { // show all
      todoFliter(todoItem, "all")
    }
    if ($(e.target).hasClass("btn-warning")) { // show incomplete
      todoFliter(todoItem, "undone")
    }
    if ($(e.target).hasClass("btn-outline-light")) { // save todo status to server
      const todos = []
      todoItem.each((i, el) => {
        todos.push({
          todo_id: $(el).attr("data-id"),
          todo: $(el).find("label")[0].innerText,
          is_checked: $(el).find("label").hasClass("crossout")
        })
      })

      const data = JSON.stringify(todos)

      $.ajax({
        type: "POST",
        url: "http://mentor-program.co/mtr04group6/jen713/week12/hw2/add_todo.php",
        data: {
          todo: data
        },
        success: function(res) {
          const resId = res.id
          window.location = "index.html?id=" + resId
        },
        error: function(err) {
          console.log(err)
        }
      })
    }
  })

  // get todo from server
  const idFromAd = window.location.search
  $.ajax({
    url: "http://mentor-program.co/mtr04group6/jen713/week12/hw2/get_todos.php" + idFromAd,
    success: function(res) {
      if (!res.ok) {
        return console.log(res.message)
      }
      const todos = res
      let { todo } = todos.data
      todo = JSON.parse(todo)

      if (todo.length === 0) return
      id = Number(todo[todo.length - 1].todo_id) + 1

      for (const item of todo) {
        const { todo_id, todo, is_checked } = item
        addTodoDOM(todoList, todo, todo_id)

        if (is_checked) {
          $(`[data-id=${todo_id}]`).find("input[type=checkbox]").prop("checked", true)
          $(`[data-id=${todo_id}]`).find("label").addClass("crossout")
          complete++
        }
        total++
      }
      changeCounts(total, complete)
    },
    error: function(err) {
      console.log(err)
    }
  })
})
