/* eslint-disable */
import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AuthContext } from "../../AuthContexts";
import { setAuthToken } from "../../utils";

// navbar
const HeaderContainer = styled.nav`
  height: 64px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: rgba(233, 228, 212, 0.3);
  border-radius: 5px;
`;

const Brand = styled.header`
  font-size: 2rem;
  font-weight: 800;
  margin-left: 1rem;
  color: #c97586;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 5rem;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  color: #513743;

  ${(props) =>
    props.$active &&
    `border-top: 1px solid rgba(162,87,104, 0.1);
    border-bottom: 1px solid rgba(162,87,104, 0.1);
    border-radius: 5px; color: #a25768;`}
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-left: 1rem;
  }
`;
const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-right: 1rem;
  }
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <HeaderContainer>
      <LeftWrapper>
        <Brand>B!og</Brand>
        <NavbarList>
          <Nav $active={location.pathname === "/"} to="/">
            Home
          </Nav>
          <Nav $active={location.pathname === "/about"} to="/about">
            About
          </Nav>
          {user && (
            <Nav $active={location.pathname === "/new-post"} to="/new-post">
              Post
            </Nav>
          )}
        </NavbarList>
      </LeftWrapper>
      <RightWrapper>
        <NavbarList>
          {!user && (
            <Nav $active={location.pathname === "/register"} to="/register">
              Register
            </Nav>
          )}
          {!user && (
            <Nav $active={location.pathname === "/login"} to="/login">
              Login
            </Nav>
          )}
          {user && `hello, ${user.nickname}`}
          {user && (
            <Nav onClick={handleLogout} to="/">
              Logout
            </Nav>
          )}
        </NavbarList>
      </RightWrapper>
    </HeaderContainer>
  );
}
