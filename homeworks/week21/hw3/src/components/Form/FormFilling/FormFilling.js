import React, { useContext } from "react";
import styled from "styled-components";
import ErrorMessage from "../../ErrorMessage";
import { FillingHandleContext } from "../../../FillingHandleContext";

const FormFillingWrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 2rem 0;
`;
const FormFillingContainer = styled.div``;
const FormFillingLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 4%;
  &:not([for="imagination"], [for="ready-made"], [for="optionFilling"])::after {
    content: " *";
    color: #e74149;
  }
  &[for="imagination"],
  &[for="ready-made"],
  &[for="optionFilling"] {
    font-size: 1rem;
  }
`;
const FormFillingInput = styled.input`
  &[type="text"] {
    height: 30px;
    padding: 0 5px;
  }
  &[type="text"]:focus {
    outline-color: #fad312;
  }

  &[type="submit"] {
    width: 90px;
    background-color: #fad312;
    padding: 13px 13px;
    border-radius: 3px;
    border: 1px solid transparent;
    margin: 4% 0 2%;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
  }
  &[type="submit"]:hover {
    border-color: #a04646;
    color: #a04646;
    background-color: transparent;
  }
  &[type="submit"]:disabled,
  &[type="submit"]:disabled:hover {
    border-color: #ccc;
    color: #ccc;
    background-color: transparent;
  }

  &[type="radio"]:checked,
  &[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
    opacity: 0;
  }
  &[type="radio"]:checked + label,
  &[type="radio"]:not(:checked) + label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
  }
  &[type="radio"]:checked + label::before,
  &[type="radio"]:not(:checked) + label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background-color: #fff;
  }
  &[type="radio"]:checked + label::after,
  &[type="radio"]:not(:checked) + label::after {
    content: "";
    width: 12px;
    height: 12px;
    background-color: #a04646;
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    transition: all 0.2s ease;
  }
  &[type="radio"]:not(:checked) + label::after {
    opacity: 0;
    transform: scale(0);
  }
  &[type="radio"]:checked + label::after {
    opacity: 1;
    transform: scale(1);
  }
`;
const FormFillingTitle = styled.div`
  font-size: 1.2rem;
  margin-bottom: 4%;
  &::after {
    content: " *";
    color: #e74149;
  }
`;
const OptionFillingTitle = styled.div`
  font-size: 1.2rem;
  margin-bottom: 4%;
`;
const CautionMessage = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
`;

const UserFilling = () => {
  const { handleInputChange, handleFormFocus, messageError } =
    useContext(FillingHandleContext);
  const fillingData = [
    {
      identity: "name",
      context: "暱稱",
      holdertext: "您的回答",
    },
    {
      identity: "email",
      context: "電子郵件",
      holdertext: "您的電子郵件: example@mail.com",
    },
    {
      identity: "phone",
      context: "手機號碼",
      holdertext: "您的手機號碼(10個數字): 1234567890",
    },
  ];

  const fillInStructure = fillingData.map((section) => {
    return (
      <FormFillingWrapper key={section.identity}>
        <FormFillingLabel htmlFor={section.identity}>
          {section.context}
        </FormFillingLabel>
        <FormFillingInput
          type="text"
          id={section.identity}
          name={section.identity}
          placeholder={section.holdertext}
          onChange={handleInputChange}
          onFocus={handleFormFocus}
        />
        {messageError[section.identity] && (
          <ErrorMessage>{messageError[section.identity]}</ErrorMessage>
        )}
      </FormFillingWrapper>
    );
  });
  return <FormFillingContainer>{fillInStructure}</FormFillingContainer>;
};

const ChoiceSelecting = () => {
  const { handleInputChange, messageError, handleFormFocus } =
    useContext(FillingHandleContext);
  const { chooseType } = messageError;
  const radioSelectData = [
    {
      subject: "choose-type",
      identity: "imagination",
      context: "躺在床上用想像力實作",
    },
    {
      subject: "choose-type",
      identity: "ready-made",
      context: "趴在地上滑手機找現成的",
    },
  ];

  const choiceStructure = radioSelectData.map((choice) => {
    return (
      <>
        <FormFillingInput
          type="radio"
          key={choice.identity}
          name={choice.subject}
          id={choice.identity}
          value={choice.context}
          onChange={handleInputChange}
          onFocus={handleFormFocus}
        />
        <FormFillingLabel htmlFor={choice.identity}>
          {choice.context}
        </FormFillingLabel>
      </>
    );
  });
  return (
    <FormFillingWrapper>
      <FormFillingTitle>報名類型</FormFillingTitle>
      {choiceStructure}
      {chooseType && <ErrorMessage>{chooseType}</ErrorMessage>}
    </FormFillingWrapper>
  );
};
const EventFilling = () => {
  const { handleInputChange, messageError, handleFormFocus } =
    useContext(FillingHandleContext);
  const { notice } = messageError;
  return (
    <FormFillingWrapper>
      <FormFillingLabel htmlFor="notice">怎麼知道這個活動的？</FormFillingLabel>
      <FormFillingInput
        type="text"
        id="notice"
        name="notice"
        placeholder="您的回答"
        onChange={handleInputChange}
        onFocus={handleFormFocus}
      />
      {notice && <ErrorMessage>{notice}</ErrorMessage>}
    </FormFillingWrapper>
  );
};
const OptionFilling = () => {
  const { handleInputChange } = useContext(FillingHandleContext);
  return (
    <FormFillingWrapper>
      <OptionFillingTitle>其他</OptionFillingTitle>
      <FormFillingLabel htmlFor="optionFilling">
        對活動的一些建議
      </FormFillingLabel>
      <FormFillingInput
        type="text"
        id="optionFilling"
        name="optionFilling"
        placeholder="您的回答"
        onChange={handleInputChange}
      />
    </FormFillingWrapper>
  );
};

export default function FormFilling() {
  const { handleSubmit, filledInfo } = useContext(FillingHandleContext);
  return (
    <form onSubmit={handleSubmit}>
      <UserFilling />
      <ChoiceSelecting />
      <EventFilling />
      <OptionFilling />
      <FormFillingInput type="submit" disabled={filledInfo && true} />
      <CautionMessage>請勿透過表單送出您的密碼。</CautionMessage>
    </form>
  );
}
