import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { showBasketCard } from "../store/actions";

const Header = () => {
  const dispatch = useDispatch();
  const basketTotalPrice = useSelector(
    (state) => state.reducer.basketTotalPrice
  );

  const handleShowBasketCard = () => {
    dispatch(showBasketCard());
  };
  return (
    <HeaderContainer>
      <img src="images/Logo.png" alt="" />
      <HeaderBasketContainer onClick={handleShowBasketCard}>
        <img src="images/basket.png" alt="" />
        <HeaderBasketText>₺ {basketTotalPrice.toFixed(2)}</HeaderBasketText>
      </HeaderBasketContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #1ea4ce;
  width: 100%;
  height: 76px;

  @media (max-width: 628px) {
    padding: 0 18px;
    justify-content: flex-start;
  }
`;

const HeaderBasketContainer = styled(HeaderContainer)`
  background-color: #147594;
  width: 129px;
  position: absolute;
  right: 104px;
  cursor: pointer;
  @media (max-width: 816px) {
    right: 52px;
  }
  @media (max-width: 628px) {
    right: 24px;
  }
  @media (max-width: 424px) {
    right: 0;
  }
`;

const HeaderBasketText = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.16px;
  color: #ffffff;
  margin-left: 8px;
`;

export default Header;
