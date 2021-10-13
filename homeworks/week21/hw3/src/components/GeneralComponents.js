import styled from "styled-components";

export default function generalComponents() {
  const Container = styled.main`
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 10% auto;
    flex-grow: 1;
  `;

  // form area
  const Form = styled.section`
    border-top: 6px solid #fad312;
    box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
    background-color: white;
  `;
  const FormContent = styled.div`
    width: 90%;
    margin: 10% auto;
  `;
  const Footer = styled.footer`
    width: 100%;
    height: 60px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    color: #999;
  `;

  return {
    Container,
    Form,
    FormContent,
    Footer,
  };
}
