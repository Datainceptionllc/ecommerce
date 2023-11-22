import React, { useRef } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { userRequest } from "../requestMethod";
import { useNavigate } from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { addProduct, removeProduct } from "../redux/cartRedux";
import { incrementQuantity, decrementQuantity } from "../redux/cartRedux";
const KEY =
  "pk_test_51O9MgWEkkmH6XzEU939sbQxc5LVPIpubjxLWbo5WIHNuE3G5CWqzeQumsTUyKFVpZLEmLPRjUBHTTGzeA9Z9dieH00V2JLL6DE";
console.log(KEY);

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 250px;
  margin: 5px;

  ${mobile({ width: "200px" })}
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ marginBottom: "20px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 55vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "20px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const stripeCheckoutRef = useRef(null);
  const [stripeToken, setStripeToken] = useState(null);
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleIncrement = (product) => {
    dispatch(incrementQuantity({ _id: product._id, size: product.size }));
  };

  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      dispatch(decrementQuantity({ _id: product._id, size: product.size }));
    } else {
      dispatch(removeProduct({ _id: product._id, size: product.size }));
    }
  };

  const onToken = (token) => {
    console.log("Received Stripe token:", token);
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log("Making payment request with token:", stripeToken);
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });

        console.log("Payment successful, received response:", res);

        navigate("/success", {
          state: { stripeData: res.data, products: cart },
        });
        console.log("Redirection to /success triggered");

        localStorage.removeItem("cart");
        console.log("Cart cleared from local storage");
      } catch (err) {
        console.error("Payment or redirection failed:", err);
      }
    };

    if (stripeToken && cart.total >= 1) {
      makeRequest();
    }
  }, [stripeToken, cart.total, navigate]);

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      stripeCheckoutRef.current.onClick();
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/products">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
          <StripeCheckout
            name="H&M"
            image="https://i.pinimg.com/736x/aa/a2/25/aaa2257c91be9791a4b453ac1769638c.jpg"
            shippingAddress
            billingAddress
            description={`Your total is ${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <TopButton type="filled" onClick={handleCheckout}>
              CHECKOUT NOW
            </TopButton>
          </StripeCheckout>
        </Top>

        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon onClick={() => handleIncrement(product)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <RemoveIcon onClick={() => handleDecrement(product)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 12 </SummaryItemPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total + 12}</SummaryItemPrice>
            </SummaryItem>

            {user && (
              <StripeCheckout
                className="stripe-checkout-button-hidden"
                style={{ display: "none" }}
                ref={stripeCheckoutRef}
                name="H&M"
                image="https://i.pinimg.com/736x/aa/a2/25/aaa2257c91be9791a4b453ac1769638c.jpg"
                shippingAddress
                billingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              />
            )}
            <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart;
