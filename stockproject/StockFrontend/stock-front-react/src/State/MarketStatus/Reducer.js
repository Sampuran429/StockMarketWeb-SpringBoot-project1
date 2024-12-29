// reducer.js
import {
    FETCH_MARKET_STATUS_REQUEST,
    FETCH_MARKET_STATUS_SUCCESS,
    FETCH_MARKET_STATUS_FAILURE,
} from './ActionType';

const initialState = {
    loading: false,
    marketStatus: {},
    error: '',
};

const marketStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MARKET_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MARKET_STATUS_SUCCESS:
            return {
                loading: false,
                marketStatus: action.payload,
                error: '',
            };
        case FETCH_MARKET_STATUS_FAILURE:
            return {
                loading: false,
                marketStatus: {},
                error: action.payload,
            };
        default:
            return state;
    }
};

export default marketStatusReducer;
