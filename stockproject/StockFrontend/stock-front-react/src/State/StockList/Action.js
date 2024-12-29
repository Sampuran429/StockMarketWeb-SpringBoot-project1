// src/State/StockList/actions.js
import axios from 'axios';
import {
    FETCH_STOCKLIST_REQUEST,
    FETCH_STOCKLIST_SUCCESS,
    FETCH_STOCKLIST_FAILURE,
} from './ActionType';

// Action creators
export const fetchStockListRequest = () => ({
    type: FETCH_STOCKLIST_REQUEST,
});

export const fetchStockListSuccess = (data) => ({
    type: FETCH_STOCKLIST_SUCCESS,
    payload: data,
});

export const fetchStockListFailure = (error) => ({
    type: FETCH_STOCKLIST_FAILURE,
    payload: error,
});

// Thunk action to fetch stock list from the API
export const fetchStockList = () => {
    return async (dispatch) => {
        dispatch(fetchStockListRequest());
        try {
            const response = await axios.get('http://localhost:8081/stocklist'); // Adjust the URL if necessary
            dispatch(fetchStockListSuccess(response.data));
        } catch (error) {
            dispatch(fetchStockListFailure(error.message));
        }
    };
};
