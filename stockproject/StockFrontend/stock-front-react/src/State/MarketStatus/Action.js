// actions.js
import axios from 'axios';
import {
    FETCH_MARKET_STATUS_REQUEST,
    FETCH_MARKET_STATUS_SUCCESS,
    FETCH_MARKET_STATUS_FAILURE,
} from './ActionType';

export const fetchMarketStatusRequest = () => ({
    type: FETCH_MARKET_STATUS_REQUEST,
});

export const fetchMarketStatusSuccess = (data) => ({
    type: FETCH_MARKET_STATUS_SUCCESS,
    payload: data,
});

export const fetchMarketStatusFailure = (error) => ({
    type: FETCH_MARKET_STATUS_FAILURE,
    payload: error,
});

// Thunk action to fetch market status from the API
export const fetchMarketStatus = () => {
    return async (dispatch) => {
        dispatch(fetchMarketStatusRequest());
        try {
            const response = await axios.get('http://localhost:8081/marketstatus');
            console.log("-------marketstatus response -------" ,response.data)
            dispatch(fetchMarketStatusSuccess(response.data));
        } catch (error) {
            dispatch(fetchMarketStatusFailure(error.message));
        }
    };
};
