import * as types from "./ActionType"
import api from "@/Config/api"

export const getAssetById=({assetId,jwt})=> async(dispatch)=>{
    dispatch({type:types.GET_ASSET_REQUEST})
    try{
        const response=await api.get(`/api/asset/${assetId}`,{
            headers:{
                Authorization:`Bearer${jwt}`
            }
        })
        dispatch({
            type:types.GET_ASSET_SUCCESS,
            payload:response.data
        })
        console.log("get asset by id-----",response.data)
    }catch(error){
        dispatch({
            type:types.GET_ASSET_FAILURE,
            error:error.message
        })
    }
}

export const getAssetDetails = ({ stockId, jwt }) => async (dispatch) => {
    dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });
    try {
      const response = await api.get(`/api/asset/stock/${stockId}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`, // Add a space between Bearer and the token
        },
      });
      
      dispatch({
        type: types.GET_ASSET_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
        console.log("asset details----",error)
      dispatch({
        type: types.GET_ASSET_DETAILS_FAILURE,
        error: error.message,
      });
    }
  };

  export const getUserAssets = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_USER_ASSET_REQUEST });
    try {
      const response = await api.get('/api/asset', {
        headers: {
          Authorization: `Bearer ${jwt}`, // Ensure the correct spacing between `Bearer` and the token
        },
      });
      dispatch({
        type: types.GET_USER_ASSET_SUCCESS,
        payload: response.data,
      });
      console.log('user assets--', response.data);
    } catch (error) {
      console.log('error', error?.response?.data);
      dispatch({
        type: types.GET_USER_ASSET_FAILURE,
        error: error.message,
      });
    }
  };