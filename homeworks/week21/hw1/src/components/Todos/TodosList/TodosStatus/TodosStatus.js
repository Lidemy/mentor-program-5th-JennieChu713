/* eslint-disable */
import React from "react";
import styled from "styled-components";

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

export default function TodoListStatusManual({ total, done, undone }) {
  return (
    <>
      <TodoListTotal>
        {done} Complete, {undone} Incomplete, {total} in Total.
      </TodoListTotal>
    </>
  );
}
