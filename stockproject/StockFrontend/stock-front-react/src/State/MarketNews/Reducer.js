// src/State/MarketNews/Reducer.js
import {
    FETCH_MARKET_NEWS_REQUEST,
    FETCH_MARKET_NEWS_SUCCESS,
    FETCH_MARKET_NEWS_FAILURE
} from './ActionType';

const initialState = {
    marketNews: [], // Initialize as an empty array
    loading: false,
    error: null,
};

const marketNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MARKET_NEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_MARKET_NEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                marketNews: Array.isArray(action.payload) ? action.payload : [], // Ensure it's an array
            };
        case FETCH_MARKET_NEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                marketNews: [], // Reset to empty array on failure
            };
        default:
            return state;
    }
};

export default marketNewsReducer;
