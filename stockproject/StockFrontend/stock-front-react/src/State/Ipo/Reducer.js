// Reducer.js
import {
    FETCH_IPO_REQUEST,
    FETCH_IPO_SUCCESS,
    FETCH_IPO_FAILURE
} from './ActionType';

const initialState = {
    ipoList: [],
    loading: false,
    error: null,
};

const ipoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IPO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_IPO_SUCCESS:
            return {
                ...state,
                loading: false,
                ipoList: action.payload,
            };
        case FETCH_IPO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default ipoReducer;
