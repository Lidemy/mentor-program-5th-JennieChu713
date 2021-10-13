/* eslint-disable */
import React from "react";
import styled from "styled-components";

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
export default function TodoListItem({
  todo,
  handleDeleteTodo,
  handleCompletionTodo,
  handleEditTodo,
  handleRenewTodo,
  handleEditChange,
}) {
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
}
