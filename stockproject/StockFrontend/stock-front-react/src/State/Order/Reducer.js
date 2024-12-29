// Importing action types correctly
import * as types from './ActionType';


// Initial state for the order reducer
const initialState = {
    order: null,
    orders: [],
    loading: false,
    error: null
};

// Order reducer to handle different action types
const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        // When an order-related request is being made (loading state)
        case types.PAY_ORDER_REQUEST:
        case types.GET_ORDER_REQUEST:
        case types.GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        // If the pay order request is successful
        case types.PAY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null
            };

        // If the get order request is successful
        case types.GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: null
            };

        // If the get all orders request is successful
        case types.GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: null
            };

        // In case any of the requests fail
        case types.PAY_ORDER_FAILURE:
        case types.GET_ORDER_FAILURE:
        case types.GET_ALL_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        // Default state if no action matches
        default:
            return state;
    }
};

export default orderReducer;
