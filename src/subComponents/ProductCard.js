import React from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { addProductToBasket } from "../store/actions";
import alertify from "alertifyjs";

const ProductCard = ({ products }) => {
  const dispatch = useDispatch();
  const handleAddProductToBasket = (selectedProduct) => {
    alertify.success("Added to basket");
    dispatch(addProductToBasket(selectedProduct));
  };
  return (
    <>
      {products.map((item) => (
        <ProductCardContainer key={item.id}>
          <ProductImageContainer>
            <ProductImage src={"images/ayi.png"} />
          </ProductImageContainer>
          <ProductPrice>{item.price}</ProductPrice>
          <ProductName>{item.name}</ProductName>
          <ProductAddButton onClick={() => handleAddProductToBasket(item)}>
            <ProductAddButtonText>Add</ProductAddButtonText>
          </ProductAddButton>
        </ProductCardContainer>
      ))}
    </>
  );
};

const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 123px;
  height: 225px;
  margin-right: 24px;
  margin-bottom: 12px;
  &:nth-of-type(4n) {
    margin-right: 0;
  }
  @media (max-width: 1444px) {
    &:nth-of-type(4n) {
      margin-right: 24px;
    }
    &:nth-of-type(5n) {
      margin-right: 0;
    }
  }
  @media (max-width: 1308px) {
    width: 24%;
    margin-right: 1%;
    &:nth-of-type(4n) {
      margin-right: 0;
    }
    &:nth-of-type(5n) {
      margin-right: 1%;
    }
  }

  @media (max-width: 1144px) {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 628px) {
    width: 32.3%;
    margin-right: 1%;
    &:nth-of-type(3n) {
      margin-right: 0%;
    }
    &:nth-of-type(4n) {
      margin-right: 1%;
    }
    &:nth-of-type(5n) {
      margin-right: 1%;
    }
  }
  @media (max-width: 424px) {
    width: 49%;
    margin-right: 1%;
    &:nth-of-type(3n) {
      margin-right: 0%;
    }
    &:nth-of-type(3n) {
      margin-right: 1%;
    }
    &:nth-of-type(4n) {
      margin-right: 1%;
    }
    &:nth-of-type(5n) {
      margin-right: 1%;
    }
  }
`;

const ProductImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  height: 124px;
  padding: 16px;
  border: 1.17px solid #f3f0fe;
  border-radius: 12px;
  margin-bottom: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ProductPrice = styled.p`
  display: flex;
  height: 23px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #1ea4ce;
`;

const ProductName = styled(ProductPrice)`
  font-family: Open Sans;
  text-align: left;
  height: 40px;
  color: #191919;
`;

const ProductAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  height: 22px;
  background: #1ea4ce;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`;

const ProductAddButtonText = styled(ProductName)`
  font-weight: 600;
  font-size: 12px;
  height: auto;
  color: #ffffff;
  margin-bottom: 0;
`;

export default ProductCard;
