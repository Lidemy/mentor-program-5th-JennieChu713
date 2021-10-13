import React from "react";
import styled from "styled-components";

// form title
const FormTitle = styled.h1`
  font-size: 2rem;
`;
const FormDesc = styled.div`
  margin: 7% 0;
`;
const FormDescItem = styled.p`
  margin: 10px 0;
  &:not(:last-child) {
    font-size: 16px;
  }
  &:last-child {
    font-size: 18px;
    color: #e74149;
    margin: 20px 0;
  }
  &:last-child::before {
    content: "* ";
    color: #e74149;
  }
`;
export default function FormTitleGroup() {
  const descriptions = [
    "活動日期：2020/12/10 ~ 2020/12/11",
    "活動地點：台北市大安區新生南路二段1號",
    "必填",
  ];
  const keyId = "desc";
  let id = 0;
  const descListout = descriptions.map((desc) => {
    id++;
    return <FormDescItem key={`${keyId}-${id}`}>{desc}</FormDescItem>;
  });

  return (
    <header>
      <FormTitle>新拖延運動報名表單</FormTitle>
      <FormDesc>{descListout}</FormDesc>
    </header>
  );
}
