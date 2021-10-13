/* eslint-disable */
import React, { useContext } from "react";
import styled from "styled-components";
import { FilterBtnsContext } from "../../../FilterBtnsContext";

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

// status filter buttons structure
export default function TodoFilters() {
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
}
