import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { publicRequest } from "../requestMethod";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://image.hm.com/ffc/share/assets/2023/2008/i/2008_06_3x2.jpg?imwidth=2160")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;

  ${mobile({ width: "75%" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Btnwrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #0f0f0f;
  color: white;
  cursor: pointer;
`;
const LinkButton = styled(Button).attrs({ as: "a" })`
  display: block;
  text-align: center;
  margin: auto;
`;
function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const signup = (e) => {
    e.preventDefault();
    publicRequest
      .post(`/auth/register`, {
        ...input,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setInput({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={signup}>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
          />
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="last name"
          />
          <Input
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            id="username"
            name="username"
            type="text"
            placeholder="username"
          />

          <Input
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            id="email"
            name="email"
            type="email"
            placeholder="email"
          />

          <Input
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
            id="password"
            name="password"
            type="password"
            placeholder="password"
          />

          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account , I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Btnwrap>
            <Button type="submit">CREATE</Button>
            <Link to="/login">
              <LinkButton as="button">LOGIN</LinkButton>
            </Link>
          </Btnwrap>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
