// Action.js
import axios from 'axios';
import {
    FETCH_STOCK_REQUEST,
    FETCH_STOCK_SUCCESS,
    FETCH_STOCK_FAILURE,
    FETCH_STOCK_BY_ID_REQUEST,
    FETCH_STOCK_BY_ID_SUCCESS,
    FETCH_STOCK_BY_ID_FAILURE,
} from './ActionType';

// Fetch stock details by symbol
export const fetchStockDetails = (symbol) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_STOCK_REQUEST });

        try {
            // http://localhost:8081/stocks/details?symbol=GDIV
            const response = await axios.get(`http://localhost:8081/stocks/details?symbol=${symbol}`);
            console.log(response.data)
            dispatch({ type: FETCH_STOCK_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_STOCK_FAILURE, payload: error.message });
        }
    };
};

// Fetch stock details by stock ID
export const fetchStockById = (stockId) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_STOCK_BY_ID_REQUEST });

        try {
            const response = await axios.get(`http://localhost:8081/stocks/findstock/${stockId}`);
            dispatch({ type: FETCH_STOCK_BY_ID_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_STOCK_BY_ID_FAILURE, payload: error.message });
        }
    };
};
