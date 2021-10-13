/* eslint-disable */
import React from "react";
import styled from "styled-components";

const TodoFormContainer = styled.section`
  border-bottom: 1px dotted rgba(157, 137, 108, 0.4);
  padding-bottom: 3%;
  margin-bottom: 4%;
`;
// const TodoFormGroup = styled.form``;// 因為 form本身的送出動作會直接重新render，除非使用 e.preventDefault 來防止送出
const TodoFormInput = styled.input`
  margin: 0 2% 0 4%;
  padding: 0 5px;
  width: 80%;
  height: 2rem;
  border: none;
  outline: none;
  font-size: 1.5rem;
  background-color: #f8f4e6;
  border-radius: 5px;
`;
const TodFormSubmit = styled.button`
  font-size: 1.2rem;
  color: #ca8269;
  background: transparent;
  border-radius: 50%;
  border: 1px solid #ca8269;
  height: 3rem;
  width: 3rem;
  padding-left: 4px;
  transition: all 0.3s;

  &:hover {
    background: #ca8269;
    color: white;
  }
`;
// Todo form structure
export default function TodoListForm({ handleChange, handleAddTodo, value }) {
  return (
    <TodoFormContainer>
      <TodoFormInput
        onChange={handleChange}
        type="text"
        placeholder={"Add Todo ..."}
        value={value}
      />
      <TodFormSubmit onClick={handleAddTodo}>Add</TodFormSubmit>
    </TodoFormContainer>
  );
}
