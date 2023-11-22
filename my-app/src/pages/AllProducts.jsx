import React from 'react';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from 'styled-components';

const Title=styled.h1`
margin:20px;
`;

 function AllProducts() {
  return (
    <div>
     <Announcement/>
      <Navbar/>
      <Title>ALL PRODUCTS</Title>
      <Products all="yes"/>
      <Newsletter/>
      <Footer/>
    </div>
  );
}

export default AllProducts;
