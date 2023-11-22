import React, { useContext } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import { AuthContext } from "./AuthContextProvider";
import { connect } from "react-redux";

const Container = styled.div`
  height: 60px;

  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;

  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;

  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold900;

  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({ justifyContent: "center", flex: 2 })}
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItemPhoto = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  border-radius: 50%;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.products.reduce(
    (accumulator, product) => accumulator + product.quantity,
    0
  );
  const user = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch();

  const { state, dispatch: dispatch1 } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch1({ type: "LOGOUT" });
    dispatch(logout());
  };

  const handleLogin = () => {
    dispatch1({ type: "LOGIN" });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pandora_Logo_2019.svg/2560px-Pandora_Logo_2019.svg.png"
              alt="H&M Logo"
              style={{
                maxHeight: "35px",
                objectFit: "contain",
              }}
            />
          </Link>
        </Center>
        <Right>
          {state.isLoggedIn ? (
            <>
              <MenuItem>Welcome, {user.currentUser.username}!</MenuItem>
              <MenuItem onClick={handleLogout}>LOG OUT</MenuItem>
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                to="/login"
                onClick={handleLogin}
                style={{ textDecoration: "none" }}
              >
                <MenuItem>LOG IN</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

//export default connect(mapStateToProps)(Navbar);

export default Navbar;
