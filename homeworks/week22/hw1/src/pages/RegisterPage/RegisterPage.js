/* eslint-disable */
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { register, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../AuthContexts";

const FormContainer = styled.form`
  margin: 3rem auto;
  width: 50%;
  text-align: center;
  padding: 2rem 0;
`;

const FormFieldSet = styled.fieldset`
  border: 1px solid rgba(240, 131, 0, 0.5);
  border-radius: 5px;
`;

const FormTitle = styled.legend`
  font-size: 2rem;
  color: #a25768;
  padding: 0 1rem;
`;

const ErrorMsg = styled.div`
  color: #e83929;
  font-size: 1.4rem;
  margin: 1.4rem auto;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
`;

const Input = styled.input`
  &[type="submit"] {
    margin-bottom: 1rem;
    background: none;
    border: 1px solid #6c2c2f;
    color: #6c2c2f;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  &[type="submit"]:hover {
    background: #6c2c2f;
    color: white;
  }
`;
const Label = styled.label`
  margin-right: 2%;
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  // handle functioning
  const handleSubmit = (e) => {
    setErrorMessage(null);
    e.preventDefault();

    register(username, nickname, password).then((data) => {
      if (data.ok === 0) {
        setAuthToken(null);
        return setErrorMessage(data.message);
      }

      setAuthToken(data.token);

      getMe().then((res) => {
        if (res.ok !== 1) {
          return setErrorMessage(res.toString());
        }
        setUser(res.data);
        history.push("/");
      });
    });
  };
  const handleOnFocus = () => {
    setErrorMessage("");
  };

  //render
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormFieldSet>
        <FormTitle>Register</FormTitle>
        <InputWrapper>
          <Label for="username">Username: </Label>
          <Input
            id="username"
            name="username"
            placeholder="Your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleOnFocus}
          />
        </InputWrapper>
        <InputWrapper>
          <Label for="nickname">Nickname: </Label>
          <Input
            id="nickname"
            name="nickname"
            placeholder="Your nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onFocus={handleOnFocus}
          />
        </InputWrapper>
        <InputWrapper>
          <Label for="password">Password: </Label>
          <Input
            id="password"
            name="password"
            placeholder="Your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleOnFocus}
          />
        </InputWrapper>
        <Input type="submit" value="Register" />
      </FormFieldSet>
      {errorMessage && <ErrorMsg>{errorMessage}</ErrorMsg>}
    </FormContainer>
  );
}
