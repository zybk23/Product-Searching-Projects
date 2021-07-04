import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { increaseProductPiece, decreaseProductPiece } from "../store/actions";

const BasketProductCard = () => {
  const dispatch = useDispatch();
  const basketProducts = useSelector((state) => state.reducer.basketProducts);
  const handleIncreaseProductPiece = (product) => {
    const params = {
      productId: product.id,
      price: product.price,
    };
    dispatch(increaseProductPiece(params));
  };

  const handleDecreaseProductPiece = (product) => {
    const params = {
      decreaseProductId: product.id,
      decreasePrice: product.price,
    };
    dispatch(decreaseProductPiece(params));
  };

  return (
    <BasketProductContainer>
      {basketProducts.map((item) => (
        <BasketProductCardContainer key={item.id}>
          <BasketProductCardLeftSide>
            <BasketProductCardProductName>
              {item.name}
            </BasketProductCardProductName>
            <BasketProductCardProductPrice>
              ₺ {item.price}
            </BasketProductCardProductPrice>
          </BasketProductCardLeftSide>
          <BasketProductCardRightSide>
            <BasketProductCardButton
              onClick={() => handleDecreaseProductPiece(item)}
            >
              -
            </BasketProductCardButton>
            <BasketProductCardProductCount>
              {item.piece}
            </BasketProductCardProductCount>
            <BasketProductCardButton
              onClick={() => handleIncreaseProductPiece(item)}
            >
              +
            </BasketProductCardButton>
          </BasketProductCardRightSide>
        </BasketProductCardContainer>
      ))}
    </BasketProductContainer>
  );
};

const BasketProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 400px;
  overflow-y: auto;
  padding: 8px 0;
`;

const BasketProductCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #f4f4f4;
  margin-bottom: 16px;
`;

const BasketProductCardLeftSide = styled.div`
  display: flex;
  flex-direction: column;
`;

const BasketProductCardProductName = styled.p`
  display: flex;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.16px;
  color: #191919;
  margin-bottom: 4px;
`;

const BasketProductCardProductPrice = styled(BasketProductCardProductName)`
  font-weight: 600;
  color: #1ea4ce;
  margin-bottom: 0;
`;

const BasketProductCardRightSide = styled(BasketProductCardLeftSide)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BasketProductCardButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: transparent;
  color: #1ea4ce;
  border: none;
  font-size: 22px;
`;

const BasketProductCardProductCount = styled(BasketProductCardButton)`
  background-color: #1ea4ce;
  color: #ffffff;
  font-size: 14px;
  cursor: default;
`;

export default BasketProductCard;
