/* eslint-disable */
import styled from "styled-components";

export default function generalComponents() {
  const Body = styled.div`
    background-color: #ede4cd;
    display: flex;
    justify-content: column;
    height: 100vh;
  `;

  const TodoListContainer = styled.main`
    width: 70%;
    margin: 5% auto;
    text-align: center;
    border-top: 6px double rgba(248, 184, 98, 0.2);
    border-bottom: 6px double rgba(248, 184, 98, 0.2);
    padding: 2%;
  `;

  const TodoListTitle = styled.h1``;

  const TodoListout = styled.section`
    border-radius: 5px 5px 0 5px;
    padding: 5% 0;
  `;

  return {
    Body,
    TodoListContainer,
    TodoListTitle,
    TodoListout,
  };
}
