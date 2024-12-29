// src/State/StockList/Reducer.js
import {
    FETCH_RECOMMENDED_STOCKS_REQUEST,
    FETCH_RECOMMENDED_STOCKS_SUCCESS,
    FETCH_RECOMMENDED_STOCKS_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    loading: false,
    stockList: [],
    error: null,
  };
  
  const recommendedStocksReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RECOMMENDED_STOCKS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_RECOMMENDED_STOCKS_SUCCESS:
        return {
          ...state,
          loading: false,
          stockList: action.payload,
        };
      case FETCH_RECOMMENDED_STOCKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default recommendedStocksReducer;
  