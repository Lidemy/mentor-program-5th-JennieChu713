/* eslint-disable */
import React from "react";
import TodosForm from "../Todos/TodosForm";
import TodoStatus from "../Todos/TodosList/TodosStatus";
import TodoItem from "../Todos/TodosList/TodoItem";
import TodoFilters from "../Todos/TodoFilters/TodoFilters";
import useTodos from "../../useTodos";
import generalComponents from "../GeneralComponents";
import { FilterBtnsContext } from "../../FilterBtnsContext";

// CSS in JS
// general components
const { Body, TodoListContainer, TodoListTitle, TodoListout } =
  generalComponents();

// front render structure and render logics
function App() {
  const {
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
  } = useTodos();

  return (
    <Body>
      <TodoListContainer>
        <TodoListTitle>Todo List</TodoListTitle>
        <TodosForm
          value={value}
          handleChange={handleChange}
          handleAddTodo={handleAddTodo}
        />
        <TodoListout>
          <FilterBtnsContext.Provider
            value={{
              handleUndoneTodos,
              handleDoneTodos,
              handleAllTodos,
              handleClearDoneTodos,
              handleClearAllTodos,
            }}
          >
            <TodoFilters />
          </FilterBtnsContext.Provider>
          <TodoStatus
            total={todos.length}
            done={todos.filter((todo) => todo.isDone).length}
            undone={todos.filter((todo) => !todo.isDone).length}
            allTodos={todos}
          />
          {filterStatusTodos(todos).map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleCompletionTodo={handleCompletionTodo}
              handleEditTodo={handleEditTodo}
              handleEditChange={handleEditChange}
              handleRenewTodo={handleRenewTodo}
            />
          ))}
        </TodoListout>
      </TodoListContainer>
    </Body>
  );
}

export default App;
