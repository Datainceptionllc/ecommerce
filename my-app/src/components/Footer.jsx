import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../responsive";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  margin-top: 40px;
  padding-left: 40px;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
  margin-top: 10px;
`;

function Footer() {
  return (
    <Container>
      <Left>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pandora_Logo_2019.svg/2560px-Pandora_Logo_2019.svg.png"
          alt="H&M Logo"
          style={{ width: "80px", maxHeight: "40px", objectFit: "contain" }}
        />
        <Desc>
          H&M is a one stop shop for all your fashion and lifestyle needs. Being
          India's largest e-commerce store for fashion and lifestyle products,
          Myntra aims at providing a hassle free and enjoyable shopping
          experience to shoppers across the country with the widest range of
          brands and products on its portal.
        </Desc>
        <SocialContainer>
          <Link to="https://www.facebook.com/king.akash.108/">
            <SocialIcon color="3B5999">
              <FacebookIcon />
            </SocialIcon>
          </Link>
          <Link to="https://www.instagram.com/akash.negetive/?next=%2F">
            <SocialIcon color="E4405F">
              <InstagramIcon />
            </SocialIcon>
          </Link>
          <Link to="https://twitter.com/home">
            <SocialIcon color="55ACEE">
              <TwitterIcon />
            </SocialIcon>
          </Link>
          <Link to="https://www.linkedin.com/in/akash-gupta-9b7988200/">
            <SocialIcon color="0072b1">
              <LinkedInIcon />
            </SocialIcon>
          </Link>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <FmdGoodIcon style={{ marginRight: "10px" }} />
          622 Dixie Path , South Tobinchester 9876
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{ marginRight: "10px" }} />
          +91 839829282992
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />
          contact@h.m
        </ContactItem>
        <Payment src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbMZ8lkI4aXUh3_VZM3kYixFoEA_V0-Ak511VOO0NucAQCj9Bbh2O-PeiYCXS7tecgxA&usqp=CAU" />
      </Right>
    </Container>
  );
}

export default Footer;
