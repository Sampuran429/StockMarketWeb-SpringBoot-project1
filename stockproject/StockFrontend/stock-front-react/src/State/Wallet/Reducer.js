import * as types from "./ActionType";

const initialstate = {
    userwallet: {},
    loading: false,
    error: null,
    transactions: [],
};

const WalletReducer = (state = initialstate, action) => {
    switch (action.type) {
        case types.GET_USER_WALLET_REQUEST:
        case types.DEPOSIT_MONEY_REQUEST:
        case types.TRANSFER_MONEY_REQUEST:
        case types.GET_WALLET_TRANSACTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
       
        case types.TRANSFER_MONEY_SUCCESS:
            return {
                ...state,
                userwallet: {
                    ...state.userwallet,
                    balance: state.userwallet.balance - action.payload.amount, // Adjust balance
                },
                loading: false,
                error: null,
            };

        case types.GET_USER_WALLET_SUCCESS:
            return {
                ...state,
                userwallet: action.payload, // Ensure payload has 'balance'
                loading: false,
                error: null,
            };
            
        case types.DEPOSIT_MONEY_SUCCESS:
            return {
                ...state,
                userwallet: action.payload,
                loading: false,
                error: null,
            };

        case types.GET_USER_WALLET_FAILURE:
        case types.DEPOSIT_MONEY_FAILURE:
        case types.TRANSFER_MONEY_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default WalletReducer;
