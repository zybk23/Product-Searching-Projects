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

const initialState = {
  products: [],
  tags: [],
  selectedTags: [{ id: 0, name: "All" }],
  companies: [],
  selectedCompanies: [{ id: 0, name: "All" }],
  sortingType: "lowToHigh",
  basketProducts: [],
  basketTotalPrice: 0,
  isShowBasket: false,
  isProductLoading: false,
  isTagsLoading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_TAGS:
      const { modifiedTags, allDataLength } = action.payload;
      const allTags = [{ id: 0, name: "All", count: allDataLength }];
      const editedTags = modifiedTags.concat(allTags);
      editedTags.sort((a, b) => a.id - b.id);
      return {
        ...state,
        tags: editedTags,
      };
    case FILTER_BY_SELECTED_TAGS:
      let modifiedSelectedTags = [...state.selectedTags];
      if (action.payload.id === 0) {
        modifiedSelectedTags = modifiedSelectedTags.filter(
          (item) => item.id === 0
        );
      }
      const exist = modifiedSelectedTags.find(
        (item) => item.id == action.payload.id
      );
      if (exist) {
        modifiedSelectedTags = modifiedSelectedTags.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        modifiedSelectedTags.push(action.payload);
        if (action.payload.id !== 0) {
          modifiedSelectedTags = modifiedSelectedTags.filter(
            (item) => item.id !== 0
          );
        }
      }
      return {
        ...state,
        selectedTags: modifiedSelectedTags,
      };

    case GET_COMPANIES:
      const { modifiedManufacturers, allDataManufacurerLength } =
        action.payload;
      const allManufacturers = [
        { id: 0, name: "All", count: allDataManufacurerLength },
      ];
      const editedManufacturers =
        modifiedManufacturers.concat(allManufacturers);
      editedManufacturers.sort((a, b) => a.id - b.id);
      return {
        ...state,
        companies: editedManufacturers,
      };

    case FILTER_BY_SELECTED_COMPANIES:
      let modifiedSelectedCompanies = [...state.selectedCompanies];

      if (action.payload.id === 0) {
        modifiedSelectedCompanies = modifiedSelectedCompanies.filter(
          (item) => item.id === 0
        );
      }

      const existCompany = modifiedSelectedCompanies.find(
        (item) => item.id == action.payload.id
      );
      if (existCompany) {
        modifiedSelectedCompanies = modifiedSelectedCompanies.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        modifiedSelectedCompanies.push(action.payload);
        if (action.payload.id !== 0) {
          modifiedSelectedCompanies = modifiedSelectedCompanies.filter(
            (item) => item.id !== 0
          );
        }
      }
      return {
        ...state,
        selectedCompanies: modifiedSelectedCompanies,
      };

    case FILTER_BY_SORTING:
      return {
        ...state,
        sortingType: action.payload,
      };

    case ADD_PRODUCT_TO_BASKET:
      let selectedBasketProducts = [...state.basketProducts];
      let totalPrice = state.basketTotalPrice;
      const productExist = selectedBasketProducts.find(
        (item) => item.id == action.payload.id
      );
      if (productExist) {
        const productIndex = selectedBasketProducts.findIndex(
          (obj) => obj.id === action.payload.id
        );
        state.basketProducts[productIndex].piece += 1;
      } else {
        selectedBasketProducts.push({ ...action.payload, piece: 1 });
      }

      totalPrice += action.payload.price;

      return {
        ...state,
        basketProducts: selectedBasketProducts,
        basketTotalPrice: totalPrice,
      };
    case INCREASE_PRODUCT_PIECE:
      const { productId, price } = action.payload;
      let increasedBasketProducts = [...state.basketProducts];
      let increseTotalPrice = state.basketTotalPrice;
      const increasedProductIndex = increasedBasketProducts.findIndex(
        (obj) => obj.id === productId
      );
      state.basketProducts[increasedProductIndex].piece += 1;
      increseTotalPrice += price;
      return {
        ...state,
        basketProducts: increasedBasketProducts,
        basketTotalPrice: increseTotalPrice,
      };

    case DECREASE_PRODUCT_PIECE:
      const { decreaseProductId, decreasePrice } = action.payload;
      let decrasedBasketProducts = [...state.basketProducts];
      let decreaseTotalPrice = state.basketTotalPrice;
      const decreasedProductIndex = decrasedBasketProducts.findIndex(
        (obj) => obj.id === decreaseProductId
      );
      if (state.basketProducts[decreasedProductIndex].piece === 1) {
        decrasedBasketProducts = decrasedBasketProducts.filter(
          (item) => item.id !== decreaseProductId
        );
      } else {
        state.basketProducts[decreasedProductIndex].piece -= 1;
      }
      decreaseTotalPrice -= decreasePrice;
      return {
        ...state,
        basketProducts: decrasedBasketProducts,
        basketTotalPrice: decreaseTotalPrice < 0 ? 0 : decreaseTotalPrice,
      };

    case IS_SHOW_BASKET:
      return {
        ...state,
        isShowBasket: !state.isShowBasket,
      };
    case IS_PRODUCT_LOADING: {
      return {
        ...state,
        isProductLoading: action.payload,
      };
    }
    case IS_TAGS_LOADING: {
      return {
        ...state,
        isTagsLoading: action.payload,
      };
    }
    default:
      return state;
  }
};
