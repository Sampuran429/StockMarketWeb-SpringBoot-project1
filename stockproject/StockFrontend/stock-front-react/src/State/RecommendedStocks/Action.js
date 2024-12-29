// src/State/StockList/actions.js
import {
    FETCH_RECOMMENDED_STOCKS_REQUEST,
    FETCH_RECOMMENDED_STOCKS_SUCCESS,
    FETCH_RECOMMENDED_STOCKS_FAILURE,
  } from "./actionTypes";
  
  import axios from "axios";
  
  // Fetch recommended stocks action
  export const fetchRecommendedStocks = (symbol) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_RECOMMENDED_STOCKS_REQUEST });
      try {
        // http://localhost:8081/recommended?symbol=AAPL
        const response = await axios.get(`http://localhost:8081/recommended?symbol=${symbol}`);
        dispatch({
          type: FETCH_RECOMMENDED_STOCKS_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: FETCH_RECOMMENDED_STOCKS_FAILURE,
          payload: error.message,
        });
      }
    };
  };
  