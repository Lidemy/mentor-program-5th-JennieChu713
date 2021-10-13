/* eslint-disable */
import React, { useContext, createContext } from "react";
import styled from "styled-components";

// useContext for filter buttons
const FilterBtnsContext = createContext();

const TodoListFilterBtns = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5%;
  * {
    font-size: 1.3rem;
    background: transparent;
    border-radius: 5px;
    transition: all 0.3s;
    color: #b39b6f;
    border: none;
    border-top: 1px solid #b39b6f;
    border-bottom: 1px solid #b39b6f;
  }
`;
const UndoneBtn = styled.button`
  &:hover {
    color: #ede4cd;
    background: #716246;
    border-color: #716246;
  }
`;
const DoneBtn = styled.button`
  &:hover {
    background: #f39800;
    color: #fff1cf;
    border-color: #f39800;
  }
`;
const AllBtn = styled.button`
  &:hover {
    background: #74325c;
    color: #fef4f4;
    border-color: #74325c;
  }
`;
const ClearDoneBtn = styled.button`
  &:hover {
    background: #928c36;
    color: #fdfdc4;
    border-color: #928c36;
  }
`;
const ClearAllBtn = styled.button`
  &:hover {
    background: #c53d43;
    color: #fde8d0;
    border-color: #c53d43;
  }
`;
const TodoListTotal = styled.div`
  font-size: 1.5rem;
  margin: 5% 0;
  color: #726250;

  &::before {
    content: "— ";
    opacity: 0.4;
  }
  &::after {
    content: " —";
    opacity: 0.4;
  }
`;
const TodoFilterGroup = () => {
  const {
    handleUndoneTodos,
    handleDoneTodos,
    handleAllTodos,
    handleClearAllTodos,
    handleClearDoneTodos,
  } = useContext(FilterBtnsContext);
  return (
    <TodoListFilterBtns>
      <UndoneBtn onClick={handleUndoneTodos}>Undone</UndoneBtn>
      <DoneBtn onClick={handleDoneTodos}>Done</DoneBtn>
      <AllBtn onClick={handleAllTodos}>All</AllBtn>
      <ClearDoneBtn onClick={handleClearDoneTodos}>Clear Done</ClearDoneBtn>
      <ClearAllBtn onClick={handleClearAllTodos}>Clear All</ClearAllBtn>
    </TodoListFilterBtns>
  );
};
const TodoItemContainer = styled.div`
  border-radius: 500px;
  margin: 0 auto 5%;
  padding: 4% 3%;
  font-size: 1.2rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(248, 244, 230, 0.7);
`;
const TodoItemContent = styled.div``;
const TodoItemDetail = styled.article`
  ${(props) =>
    props.$isDone && `text-decoration: line-through; color: #bc8f8f;`}
`;
const TodoItemEditContent = styled.div`
  display: flex;
  * {
    font-size: 1.1rem;
  }
`;
const TodoItemEditInput = styled.input`
  width: 26rem;
  border: none;
  background: rgba(238, 232, 170, 0.5);
  outline: none;
  padding: 5px;
  box-sizing: border-box;
  margin-right: 2%;
`;
const TodoItemEditSubmit = styled.button`
  background: transparent;
  border: none;
  transition: all 0.3s;
  border-radius: 5px;
  color: #d7a98c;
  &:hover {
    background: #ee836f;
    color: #fde8d0;
  }
`;
const TodoItemBtns = styled.div`
  * {
    font-size: 1.1rem;
    background: transparent;
    color: #d7a98c;
    border: none;
    border-radius: 5px;
    transition: all 0.3s;
  }
`;
const TodoItemBtnStatus = styled.button`
  &:hover {
    background: #f39800;
    color: #fff1cf;
  }
`;
const TodoItemBtnEdit = styled.button`
  &:hover {
    background: #ee836f;
    color: #fde8d0;
  }
`;
const TodoItemBtnDelete = styled.button`
  &:hover {
    background: #c53d43;
    color: #fde8d0;
  }
`;
const TodoListItem = ({
  todo,
  handleDeleteTodo,
  handleCompletionTodo,
  handleEditTodo,
  handleRenewTodo,
  handleEditChange,
}) => {
  return (
    <TodoItemContainer data-todo-id={todo.id}>
      {todo.isEditing ? (
        <TodoItemEditContent>
          <TodoItemEditInput
            type="text"
            id={todo.id}
            $isDone={todo.isDone}
            $isEdit={todo.isEditing}
            defaultValue={todo.content}
            onChange={handleEditChange}
          />
          <TodoItemEditSubmit
            onClick={() => {
              handleRenewTodo(todo.id);
            }}
          >
            Edit
          </TodoItemEditSubmit>
        </TodoItemEditContent>
      ) : (
        <>
          <TodoItemContent>
            <TodoItemDetail
              id={todo.id}
              $isDone={todo.isDone}
              $isEdit={todo.isEditing}
            >
              {todo.content}
            </TodoItemDetail>
          </TodoItemContent>
          <TodoItemBtns>
            <TodoItemBtnStatus
              onClick={() => {
                handleCompletionTodo(todo.id);
              }}
            >
              {todo.isDone ? "Undone" : "Done"}
            </TodoItemBtnStatus>
            <TodoItemBtnEdit
              onClick={() => {
                handleEditTodo(todo.id);
              }}
            >
              Edit
            </TodoItemBtnEdit>
            <TodoItemBtnDelete
              onClick={() => {
                handleDeleteTodo(todo.id);
              }}
            >
              Delete
            </TodoItemBtnDelete>
          </TodoItemBtns>
        </>
      )}
    </TodoItemContainer>
  );
};
export default function TodoListStatusManual({ total, done, undone }) {
  return (
    <>
      <TodoFilterGroup />
      <TodoListTotal>
        {done} Complete, {undone} Incomplete, {total} in Total.
      </TodoListTotal>
    </>
  );
}
