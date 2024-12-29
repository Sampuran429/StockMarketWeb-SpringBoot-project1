import * as types from './ActionType';
import api from '@/Config/api';

// Fetch user watchlist
export const getUserWatchlist = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_WATCHLIST_REQUEST });
  try {
    const response = await api.get(`/api/watchlist/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`, // Added space after Bearer
      },
    });
    dispatch({
      type: types.GET_USER_WATCHLIST_SUCCESS,
      payload: response.data,
    });
    console.log("user watchlist", response.data);
  } catch (error) {
    dispatch({
      type: types.GET_USER_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};

// Add stock to watchlist
export const addItemtoWatchlist = ({ stockId, jwt }) => async (dispatch) => {
  dispatch({ type: types.ADD_STOCK_TO_WATCHLIST_REQUEST });
  try {
    const response = await api.patch(`/api/watchlist/add/stock/${stockId}`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.ADD_STOCK_TO_WATCHLIST_SUCCESS,
      payload: response.data,
    });
    console.log("add stock to watchlist", response.data);
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: types.ADD_STOCK_TO_WATCHLIST_FAILURE,
      error: error.message,
    });
  }
};


// Delete stock from watchlist
export const deleteItemFromWatchlist = ({ stockId, jwt }) => async (dispatch) => {
    dispatch({ type: types.DELETE_STOCK_TO_WATCHLIST_REQUEST });
    try {
        const response = await api.patch(`/api/watchlist/remove/stock/${stockId}`, {}, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: types.DELETE_STOCK_TO_WATCHLIST_SUCCESS,
            payload: stockId, // Use stockId in the payload
        });
        console.log("Stock deleted from watchlist:", response.data);
    } catch (error) {
        console.log("Error:", error);
        dispatch({
            type: types.DELETE_STOCK_TO_WATCHLIST_FAILURE,
            error: error.message,
        });
    }
};
