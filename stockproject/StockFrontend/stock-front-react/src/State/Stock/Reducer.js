// Reducer.js
import {
    FETCH_STOCK_REQUEST,
    FETCH_STOCK_SUCCESS,
    FETCH_STOCK_FAILURE,
    FETCH_STOCK_BY_ID_REQUEST,
    FETCH_STOCK_BY_ID_SUCCESS,
    FETCH_STOCK_BY_ID_FAILURE,
} from './ActionType';

const initialState = {
    stock: null,
    loading: false,
    error: null,
};

const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STOCK_REQUEST:
        case FETCH_STOCK_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_STOCK_SUCCESS:
        case FETCH_STOCK_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                stock: action.payload,
            };
        case FETCH_STOCK_FAILURE:
        case FETCH_STOCK_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default stockReducer;
