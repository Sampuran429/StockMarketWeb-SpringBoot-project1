// src/State/MarketNews/Action.js
import axios from 'axios';
import {
    FETCH_MARKET_NEWS_REQUEST,
    FETCH_MARKET_NEWS_SUCCESS,
    FETCH_MARKET_NEWS_FAILURE
} from './ActionType';

export const fetchMarketNews = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_MARKET_NEWS_REQUEST });

        try {
            const response = await axios.get('http://localhost:8081/marketnews');
            console.log("Market News Data Response:", response);  // Log the full response
            
            // Ensure that the data is in the expected format (JSON)
            if (response && response.data) {
                dispatch({ type: FETCH_MARKET_NEWS_SUCCESS, payload: response.data });
            } else {
                dispatch({ type: FETCH_MARKET_NEWS_FAILURE, payload: "No valid data found" });
            }
        } catch (error) {
            console.error("Error fetching market news:", error.message);
            dispatch({ type: FETCH_MARKET_NEWS_FAILURE, payload: error.message });
        }
    };
};
