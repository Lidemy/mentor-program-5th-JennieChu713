/* eslint-disable */
import { useState, useEffect, useRef } from "react";

// reserve todoList in localstorage
function writeTodoLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

export default function useTodos() {
  // id initialize
  const id = useRef(1);
  // todos initialize
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || "";
    if (todoData) {
      todoData = JSON.parse(todoData);
      if (todoData.length && todoData[0].id) {
        id.current = todoData[0].id + 1;
      }
    } else {
      todoData = [];
    }
    return todoData;
  });
  // add todo value initialize
  const [value, setValue] = useState("");

  // edit todo value initialize
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    writeTodoLocalStorage(todos);
  }, [todos]);

  // add todo functioning
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      return;
    }
    setValue(e.target.value);
  };
  const handleAddTodo = () => {
    const addTodo = [
      {
        id: id.current,
        content: value,
        isDone: false,
        isEditing: false,
        filterStatus: "all",
      },
      ...todos,
    ];
    setTodos(addTodo);
    id.current += 1;
    setValue("");
  };

  // delete todo functioning
  const handleDeleteTodo = (id) => {
    const deleteTodo = todos.filter((todo) => todo.id !== id);
    setTodos(deleteTodo);
  };

  // checkout todo completion status functioning
  const handleCompletionTodo = (id) => {
    const getTodo = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        isDone: !todo.isDone,
      };
    });
    setTodos(getTodo);
  };
  // edit Todo item's content functioning
  const handleEditTodo = (id) => {
    const getTodo = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        isEditing: !todo.isEditing,
      };
    });
    setTodos(getTodo);
  };
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };
  const handleRenewTodo = (id) => {
    const getTodo = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        content: editValue || todo.content, // if editValue is blank (as false), return pre-state value
        isEditing: false,
      };
    });
    setValue("");
    setTodos(getTodo);
  };

  // filter buttons functions
  // filterout Undone todos functioning
  const handleUndoneTodos = () => {
    const filterTodos = todos.map((todo) => ({
      ...todo,
      filterStatus: "undone",
    }));
    setTodos(filterTodos);
  };
  //filterout Done todos functioning
  const handleDoneTodos = () => {
    const filterTodos = todos.map((todo) => ({
      ...todo,
      filterStatus: "done",
    }));
    setTodos(filterTodos);
  };
  // listout all todos
  const handleAllTodos = () => {
    const filterTodos = todos.map((todo) => ({
      ...todo,
      filterStatus: "all",
    }));
    setTodos(filterTodos);
  };
  // clear all done todos
  const handleClearDoneTodos = () => {
    setTodos(todos.filter((todo) => !todo.isDone));
  };
  // clear all todos
  const handleClearAllTodos = () => {
    setTodos([]);
  };

  //todo filter render function
  const filterStatusTodos = (todos) => {
    if (todos.length) {
      if (todos[0].filterStatus === "undone") {
        return todos.filter((todo) => !todo.isDone);
      }
      if (todos[0].filterStatus === "done") {
        return todos.filter((todo) => todo.isDone);
      }
      return todos;
    }
    return todos;
  };
  return {
    todos,
    value,
    handleChange,
    handleAddTodo,
    handleDeleteTodo,
    handleCompletionTodo,
    handleEditTodo,
    handleEditChange,
    handleRenewTodo,
    handleUndoneTodos,
    handleDoneTodos,
    handleAllTodos,
    handleClearDoneTodos,
    handleClearAllTodos,
    filterStatusTodos,
  };
}
