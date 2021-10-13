/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../Header";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  AboutPage,
  NewPostPage,
  PostPage,
} from "../../pages";
import { AuthContext } from "../../AuthContexts";

// CSS in JS
const Root = styled.main`
  background-color: rgba(255, 255, 252, 0.3);
  height: 80vh;
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/post/:postId">
              <PostPage />
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/new-post">
              <NewPostPage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
