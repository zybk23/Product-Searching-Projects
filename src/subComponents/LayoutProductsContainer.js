import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ProductCard from "../subComponents/ProductCard";
import Loader from "react-loader-spinner";

const LayoutProducts = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState("mug");
  const products = useSelector((state) => state.reducer.products);
  const selectedTags = useSelector((state) => state.reducer.selectedTags);
  const selectedCompanies = useSelector(
    (state) => state.reducer.selectedCompanies
  );
  const sortingType = useSelector((state) => state.reducer.sortingType);
  const isProductLoading = useSelector(
    (state) => state.reducer.isProductLoading
  );

  const tagNames = selectedTags.map((x) => {
    return x.name;
  });

  let filteredProducts = [...products];

  filteredProducts = filteredProducts.filter((x) => x.itemType == tabValue);

  if (sortingType === "lowToHigh") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortingType === "highToLow") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortingType === "newToOld") {
    filteredProducts = filteredProducts.sort((a, b) => a.added - b.added);
  }
  if (sortingType === "oldToNew") {
    filteredProducts = filteredProducts.sort((a, b) => b.added - a.added);
  }

  if (selectedTags.length > 1) {
    filteredProducts = filteredProducts.filter((x) => {
      return x.tags.some((a) => {
        return tagNames.includes(a);
      });
    });
  }

  if (selectedCompanies.length > 1) {
    filteredProducts = filteredProducts.filter((el) => {
      return selectedCompanies.find((element) => {
        return element.name == el.manufacturer;
      });
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const pages = [];

  for (
    let i = 1;
    i <=
    Math.ceil(
      (filteredProducts.length > 0 ? filteredProducts : products).length /
        itemsPerPage
    );
    i++
  ) {
    pages.push(i);
  }

  const [pageNumberLimit, setPageNumberLimit] = useState(7);
  const [maxPageNumberLimitFirstPart, setMaxPageNumberLimitFirstPart] =
    useState(7);
  const [minPageNumberLimitFirstPart, setMinpageNumberLimitFirstPart] =
    useState(0);
  const [maxPageNumberLimitSecondPart, setMaxPageNumberLimitSecondPart] =
    useState(pages.length);
  const [minPageNumberLimitSecondPart, setMinpageNumberLimitSecondPart] =
    useState(pages.length - 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = (
    filteredProducts.length > 0 ? filteredProducts : products
  ).slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectMugTab = () => {
    setTabValue("mug");
  };

  const handleSelectShirtTab = () => {
    setTabValue("shirt");
  };

  const handleClickPageNumber = (e) => {
    const id = Number(e.target.id);
    setCurrentPage(id);
    if (id > pages.length - 3) {
      setMinpageNumberLimitFirstPart(id - 6);
      setMaxPageNumberLimitFirstPart(id + 1);
    }
  };

  const handleClickNextButton = () => {
    if (currentPage === pages.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimitFirstPart) {
      setMaxPageNumberLimitFirstPart(
        maxPageNumberLimitFirstPart + pageNumberLimit
      );
      setMinpageNumberLimitFirstPart(
        minPageNumberLimitFirstPart + pageNumberLimit
      );
    }
  };
  const handleClickPrevButton = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimitFirstPart(
        maxPageNumberLimitFirstPart - pageNumberLimit
      );
      setMinpageNumberLimitFirstPart(
        minPageNumberLimitFirstPart - pageNumberLimit
      );
    }
  };

  useEffect(() => {
    setMaxPageNumberLimitSecondPart(pages.length);
    setMinpageNumberLimitSecondPart(pages.length - 1);
  }, [pages]);

  return (
    <LayoutProductsContainer>
      <ProductTitle>Products</ProductTitle>
      <ProductsTabContainer>
        <ProductsTabItem
          onClick={handleSelectMugTab}
          bgcolor={tabValue === "mug" ? "#1ea4ce" : " #f2f0fd"}
          color={tabValue === "mug" ? "#f2f0fd" : "  #1ea4ce "}
        >
          mug
        </ProductsTabItem>
        <ProductsTabItem
          onClick={handleSelectShirtTab}
          bgcolor={tabValue === "shirt" ? "#1ea4ce" : " #f2f0fd"}
          color={tabValue === "shirt" ? "#f2f0fd" : "  #1ea4ce "}
        >
          shirt
        </ProductsTabItem>
      </ProductsTabContainer>
      <ProductsContainer>
        {isProductLoading ? (
          <Loader
            type="Oval"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        ) : (
          <ProductCard products={currentData} />
        )}
      </ProductsContainer>
      <PaginationArea>
        <PaginationContainer>
          <PaginationPrevButtonContainer
            disabled={currentPage === 1}
            onClick={handleClickPrevButton}
          >
            <PaginationPrevIcon
              color={currentPage === 1 ? "#697488" : " #1ea4ce"}
              className="fas fa-arrow-left"
            />
            <PaginationPrevText
              color={currentPage === 1 ? "#697488" : " #1ea4ce"}
            >
              Prev
            </PaginationPrevText>
          </PaginationPrevButtonContainer>
          <PaginationPageNumberContainer>
            {pages.map((item, index) => (
              <div key={index}>
                {item < maxPageNumberLimitFirstPart + 1 &&
                  item > minPageNumberLimitFirstPart &&
                  (item === pages.length ? null : (
                    <PaginationPageNumber
                      id={item}
                      color={currentPage === item ? "#ffffff" : "#697488"}
                      bgColor={currentPage === item ? "#1EA4CE" : "transparent"}
                      onClick={handleClickPageNumber}
                    >
                      {item}
                    </PaginationPageNumber>
                  ))}
                {item === pages.length - 1 && currentPage < pages.length - 5 ? (
                  <PaginationContinue>{"....."}</PaginationContinue>
                ) : null}
                {item < maxPageNumberLimitSecondPart + 1 &&
                  item > minPageNumberLimitSecondPart && (
                    <PaginationPageNumber
                      id={item}
                      color={currentPage === item ? "#ffffff" : "#697488"}
                      bgColor={currentPage === item ? "#1EA4CE" : "transparent"}
                      onClick={handleClickPageNumber}
                    >
                      {item}
                    </PaginationPageNumber>
                  )}
              </div>
            ))}
          </PaginationPageNumberContainer>
          <PaginationNextButtonContainer onClick={handleClickNextButton}>
            <PaginationNextText
              color={currentPage === pages.length ? "#697488" : " #1ea4ce"}
            >
              Next
            </PaginationNextText>
            <PaginationNextIcon
              color={currentPage === pages.length ? "#697488" : " #1ea4ce"}
              className="fas fa-arrow-right"
            />
          </PaginationNextButtonContainer>
        </PaginationContainer>
      </PaginationArea>
    </LayoutProductsContainer>
  );
};

const LayoutProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 608px;
  margin-right: 16px;
  padding: 0;
  margin-top: 0;
  @media (max-width: 1444px) {
    max-width: 755px;
    margin-right: 0;
  }
  @media (max-width: 1144px) {
    max-width: 100%;
    margin-right: 0;
  }
  @media (max-width: 1012px) {
    margin-top: 48px;
  }
`;

const ProductTitle = styled.p`
  display: flex;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 26px;
  display: flex;
  align-items: center;
  letter-spacing: 0.25px;
  color: #6f6f6f;
  margin-bottom: 16px;
  text-align: left;
`;

const ProductsTabContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const ProductsTabItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;
  background-color: ${(p) => p.bgcolor};
  border-radius: 2px;
  color: ${(p) => p.color};
  cursor: pointer;
  border: none;
`;

const ProductsContainer = styled(ProductsTabContainer)`
  width: 100%;
  flex-wrap: wrap;
  padding: 22px;
  background-color: #ffffff;
  @media (max-width: 1144px) {
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 628px) {
    justify-content: flex-start;
  }
`;

const PaginationArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  @media (max-width: 628px) {
    margin-bottom: 20px;
    padding: 8px;
  }
`;

const PaginationContainer = styled(PaginationArea)`
  flex-direction: row;
  justify-content: space-between;
  width: 535px;
  @media (max-width: 628px) {
    width: 100%;
  }
`;

const PaginationPageNumberContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const PaginationPrevButtonContainer = styled.button`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
  margin-right: 57px;
  @media (max-width: 628px) {
    margin-right: 27px;
  }
  @media (max-width: 512px) {
    margin-right: 8px;
  }
`;

const PaginationNextButtonContainer = styled(PaginationPrevButtonContainer)`
  margin-left: 57px;
  @media (max-width: 628px) {
    margin-left: 27px;
  }
  @media (max-width: 424px) {
    margin-left: 8px;
  }
`;

const PaginationPrevIcon = styled.i`
  font-size: 16px;
  color: ${(p) => p.color};
`;

const PaginationPrevText = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: ${(p) => p.color};
  margin-left: 7px;
`;

const PaginationPageNumber = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  padding: 12px;
  cursor: pointer;
  border: none;
  background-color: ${(p) => p.bgColor};
  color: ${(p) => p.color};
  @media (max-width: 424px) {
    padding: 8px;
  }
`;

const PaginationContinue = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const PaginationNextIcon = styled(PaginationPrevIcon)`
  color: ${(p) => p.color};
`;

const PaginationNextText = styled(PaginationPrevText)`
  color: ${(p) => p.color};
  margin-left: 0;
  margin-right: 7px;
`;

export default LayoutProducts;
