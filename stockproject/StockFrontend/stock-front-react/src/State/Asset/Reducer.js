import * as types from './ActionType';

const initialState = {
  asset: null,
  userAssets: [], // Corrected state key
  loading: false,
  error: null,
  assetDetails: null,
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Asset
    case types.GET_ASSET_REQUEST:
    case types.GET_USER_ASSET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ASSET_SUCCESS:
      return {
        ...state,
        loading: false,
        asset: action.payload,
        error: null,
      };
    case types.GET_ASSET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case types.GET_USER_ASSET_SUCCESS:
      return {
        ...state,
        loading: false,
        userAssets: action.payload, // Fixed typo: userAssets
        error: null,
      };
    case types.GET_USER_ASSET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    // Get Asset Details
    case types.GET_ASSET_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_ASSET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        assetDetails: action.payload,
        error: null,
      };
    case types.GET_ASSET_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default assetReducer;
