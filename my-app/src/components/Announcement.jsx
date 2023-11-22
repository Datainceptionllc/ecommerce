import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 350;
  font-family: "Roboto", sans-serif;
`;

function Announcement() {
  return <Container>Super Deal! Free Shipping on Order Over 2000.</Container>;
}

export default Announcement;
