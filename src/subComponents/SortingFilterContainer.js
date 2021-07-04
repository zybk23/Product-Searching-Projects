import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { filterBySorting } from "../store/actions";

const FilterContainer = ({ height, title, isSearch }) => {
  const dispatch = useDispatch();
  const sortingType = useSelector((state) => state.reducer.sortingType);
  const onChangeValue = (e) => {
    dispatch(filterBySorting(e.target.value));
  };
  return (
    <StyledFilterContainer height={height}>
      <StyledFilterTitle>Sorting</StyledFilterTitle>
      <StyledFilterArea value={"lowToHigh"} onChange={onChangeValue}>
        <StyledFilterItemsContainer>
          <StyledRadioButton
            type="radio"
            value="lowToHigh"
            checked={sortingType === "lowToHigh"}
            onChange={() => {}}
            name="radioFilter"
          />
          <StyledFilterText>Price low to high</StyledFilterText>
        </StyledFilterItemsContainer>
        <StyledFilterItemsContainer>
          <StyledRadioButton
            type="radio"
            value="highToLow"
            name="radioFilter"
          />
          <StyledFilterText>Price high to low</StyledFilterText>
        </StyledFilterItemsContainer>
        <StyledFilterItemsContainer>
          <StyledRadioButton type="radio" value="newToOld" name="radioFilter" />
          <StyledFilterText>New to old</StyledFilterText>
        </StyledFilterItemsContainer>
        <StyledFilterItemsContainer>
          <StyledRadioButton type="radio" value="oldToNew" name="radioFilter" />
          <StyledFilterText>Old to new</StyledFilterText>
        </StyledFilterItemsContainer>
      </StyledFilterArea>
    </StyledFilterContainer>
  );
};

const StyledFilterContainer = styled.div`
  width: 100%;
  height: 214px;
  margin-bottom: 36px;
  @media (max-width: 1144px) {
    height: 274px;
  }
  @media (max-width: 1012px) {
    width: 50%;
  }

  @media (max-width: 628px) {
    width: 100%;
  }
`;

const StyledFilterTitle = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #697488;
  margin-bottom: 12px;
`;

const StyledFilterArea = styled(StyledFilterContainer)`
  background-color: #ffffff;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 24px;
  @media (max-width: 1012px) {
    width: 100%;
  }
`;

const StyledFilterItemsContainer = styled(StyledFilterArea)`
  margin-bottom: 18px;
  flex-direction: row;
  padding: 0;
`;

const StyledRadioButton = styled.input`
  width: 18px;
  height: 18px;
`;

const StyledFilterText = styled(StyledFilterTitle)`
  color: #525252;
  margin-bottom: 0;
  margin-left: 8px;
  align-items: flex-start;
`;

export default memo(FilterContainer);
