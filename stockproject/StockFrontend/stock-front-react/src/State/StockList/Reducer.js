// src/State/StockList/reducer.js
import {
    FETCH_STOCKLIST_REQUEST,
    FETCH_STOCKLIST_SUCCESS,
    FETCH_STOCKLIST_FAILURE,
} from './ActionType';

const initialState = {
    loading: false,
    stockList: [],
    error: '',
};

const stockListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STOCKLIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_STOCKLIST_SUCCESS:
            return {
                loading: false,
                stockList: action.payload,
                error: '',
            };
        case FETCH_STOCKLIST_FAILURE:
            return {
                loading: false,
                stockList: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default stockListReducer;
