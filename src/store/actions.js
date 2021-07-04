import axios from "axios";
import {
  GET_PRODUCTS,
  GET_TAGS,
  FILTER_BY_SELECTED_TAGS,
  GET_COMPANIES,
  FILTER_BY_SELECTED_COMPANIES,
  FILTER_BY_SORTING,
  ADD_PRODUCT_TO_BASKET,
  INCREASE_PRODUCT_PIECE,
  DECREASE_PRODUCT_PIECE,
  IS_SHOW_BASKET,
  IS_PRODUCT_LOADING,
  IS_TAGS_LOADING,
} from "./types";

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: IS_PRODUCT_LOADING, payload: true });
    dispatch({ type: IS_TAGS_LOADING, payload: true });
    await axios
      .get("https://getirserver.herokuapp.com/api/products")
      .then((response) => {
        const data = response.data;
        const modifiedData = [];

        const tags = [];
        const manufacturers = [];

        data.map((item, index) => {
          modifiedData.push({ ...item, id: index + 1 });
          tags.push(...item.tags);
          manufacturers.push(item.manufacturer);
        });

        const uniqueTags = [...new Set(tags.sort())];
        const uniqueManufacturers = [...new Set(manufacturers.sort())];

        function CountSameElementInArray(arr) {
          const countElement = [];
          arr.sort();

          var current = null;
          var cnt = 0;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] != current) {
              if (cnt > 0) {
                countElement.push(cnt);
              }
              current = arr[i];
              cnt = 1;
            } else {
              cnt++;
            }
          }
          if (cnt > 0) {
            countElement.push(cnt);
          }
          return countElement;
        }

        const countTags = CountSameElementInArray(tags);

        const countManufacturers = CountSameElementInArray(manufacturers);

        const modifiedTags = [];

        const modifiedManufacturers = [];

        for (let i = 0; i < uniqueTags.length; i++) {
          modifiedTags.push({
            id: i + 1,
            name: uniqueTags[i],
            count: countTags[i],
          });
        }
        for (let i = 0; i < uniqueManufacturers.length; i++) {
          modifiedManufacturers.push({
            id: i + 1,
            name: uniqueManufacturers[i],
            count: countManufacturers[i],
          });
        }
        dispatch({ type: GET_PRODUCTS, payload: modifiedData });
        dispatch({
          type: GET_TAGS,
          payload: { modifiedTags, allDataLength: modifiedData.length },
        });
        dispatch({
          type: GET_COMPANIES,
          payload: {
            modifiedManufacturers,
            allDataManufacurerLength: modifiedData.length,
          },
        });
        dispatch({ type: IS_PRODUCT_LOADING, payload: false });
        dispatch({ type: IS_TAGS_LOADING, payload: false });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: IS_PRODUCT_LOADING, payload: false });
        dispatch({ type: IS_TAGS_LOADING, payload: false });
      });
  };
};

export const filterBySelectedTags = (selectedTag) => {
  return (dispatch) => {
    dispatch({ type: FILTER_BY_SELECTED_TAGS, payload: selectedTag });
  };
};

export const getCompanies = () => {
  return (dispatch) => {
    axios
      .get("https://getirserver.herokuapp.com/api/companies")
      .then((response) => {
        const componies = response.data;
        const modifiedData = [];
        componies.map((item, index) => {
          modifiedData.push({ ...item, id: index + 1 });
        });

        const uniqueCompanies = [...new Set(modifiedData.sort())];

        const countCompanies = [];

        function companyCount(company) {
          company.sort();

          var current = null;
          var cnt = 0;
          for (var i = 0; i < company.length; i++) {
            if (company[i] != current) {
              if (cnt > 0) {
                countCompanies.push(cnt);
              }
              current = company[i];
              cnt = 1;
            } else {
              cnt++;
            }
          }
          if (cnt > 0) {
            countCompanies.push(cnt);
          }
        }

        companyCount(componies);

        const modifiedCompanies = [];

        for (let i = 0; i < uniqueCompanies.length; i++) {
          modifiedCompanies.push({
            ...uniqueCompanies[i],
            count: countCompanies[i],
          });
        }

        // dispatch({ type: GET_COMPANIES, payload: modifiedCompanies });
      });
  };
};

export const filterBySelectedComponies = (selectedCompanies) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_SELECTED_COMPANIES,
      payload: selectedCompanies,
    });
  };
};

export const filterBySorting = (sortingValue) => {
  return (dispatch) => {
    dispatch({
      type: FILTER_BY_SORTING,
      payload: sortingValue,
    });
  };
};

export const addProductToBasket = (product) => {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT_TO_BASKET, payload: product });
  };
};

export const increaseProductPiece = (params) => {
  return (dispatch) => {
    dispatch({ type: INCREASE_PRODUCT_PIECE, payload: params });
  };
};

export const decreaseProductPiece = (params) => {
  return (dispatch) => {
    dispatch({ type: DECREASE_PRODUCT_PIECE, payload: params });
  };
};

export const showBasketCard = () => {
  return (dispatch) => {
    dispatch({ type: IS_SHOW_BASKET });
  };
};
