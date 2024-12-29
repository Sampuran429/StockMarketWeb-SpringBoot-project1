// src/State/Store.js
import { thunk } from "redux-thunk"; 
import authReducer from "./Auth/Reducer";
import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import stockReducer from "./Stock/Reducer";
import ipoReducer from "./Ipo/Reducer";
import marketNewsReducer from "./MarketNews/Reducer";
import marketStatusReducer from "./MarketStatus/Reducer";
import stockListReducer from "./StockList/Reducer";
import WalletReducer from "./Wallet/Reducer";
import withdrawalReducer from "./Withdrawal/Reducer";
import orderReducer from "./Order/Reducer";
import assetReducer from "./Asset/Reducer";
import watchlistReducer from "./Watchlist/Reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    stock: stockReducer, // The key for accessing stockReducer is 'stock'
    ipo: ipoReducer,
    marketnews: marketNewsReducer,
    marketstatus: marketStatusReducer,
    stocklist: stockListReducer,
    wallet:WalletReducer,
    withdrawal:withdrawalReducer,
    order:orderReducer,
    asset:assetReducer,
    watchlist:watchlistReducer
    // Other reducers...
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));