// Action.js
import axios from 'axios';
import {
    FETCH_IPO_REQUEST,
    FETCH_IPO_SUCCESS,
    FETCH_IPO_FAILURE
} from './ActionType';

// Fetch IPO list between the given date range
export const fetchIpoList = (from, to) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_IPO_REQUEST });

        try {
            const response = await axios.get(`/ipolist?from=${from}&to=${to}`);
            dispatch({ type: FETCH_IPO_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_IPO_FAILURE, payload: error.message });
        }
    };
};
