import * as types from './ActionType';
import { existInWatchlist } from '@/utils/ExistInWatchlist';

const initialState = {
  watchlist: [],
  loading: false,
  error: null,
  items: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get User Watchlist
    case types.GET_USER_WATCHLIST_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case types.GET_USER_WATCHLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        watchlist: action.payload,
        items: action.payload.stocks, // Assuming 'stocks' is part of the response
        error: null,
      };
    }
    case types.GET_USER_WATCHLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    // Add Stock to Watchlist
    case types.ADD_STOCK_TO_WATCHLIST_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case types.ADD_STOCK_TO_WATCHLIST_SUCCESS: {
      let updatedItems = existInWatchlist(state.items, action.payload)
        ? state.items.filter((item) => item.id !== action.payload.id) // Remove if exists
        : [action.payload, ...state.items]; // Add if not exists
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null,
      };
    }
    case types.ADD_STOCK_TO_WATCHLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    // Remove Stock from Watchlist
    case types.DELETE_STOCK_TO_WATCHLIST_REQUEST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case types.DELETE_STOCK_TO_WATCHLIST_SUCCESS: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload), // Filter out the deleted stock
        loading: false,
        error: null,
      };
    }
    case types.DELETE_STOCK_TO_WATCHLIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export default watchlistReducer;
