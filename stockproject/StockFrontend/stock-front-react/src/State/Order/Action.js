import * as types from './ActionType'
import api from '@/Config/api'

export const PayOrder = ({ jwt, orderData, amount }) => async (dispatch) => {
    dispatch({ type: types.PAY_ORDER_REQUEST });

    try {
        // Sending order data to the backend
        const response = await api.post('/api/orders/pay', orderData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({
            type: types.PAY_ORDER_SUCCESS,
            payload: response.data, // Response payload from server
            amount, // Amount involved in the transaction
        });

        console.log("Order success: ", response.data);
    } catch (error) {
        console.log("Error: ", error);
        dispatch({
            type: types.PAY_ORDER_FAILURE,
            error: error.message, // Error message
        });
    }
};

export const getOrderById=(jwt,orderId)=>async(dispatch)=>{
    dispatch({type:types.GET_ORDER_REQUEST})
    try{
        const response=await api.get(`/api/orders/${orderId}`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({
            type:types.GET_ORDER_SUCCESS,
            payload:response.data
        })
    }catch(error){
        console.log(error)
        dispatch({
            type:types.GET_ORDER_FAILURE,
            error:error.message
        })
    }
}

export const getAllOrdersForUser=({jwt})=>async(dispatch)=>{
    dispatch({type:types.GET_ALL_ORDERS_REQUEST})
    try{
        const response=await api.get(`/api/orders`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            },
            // params:{
            //     order_type:ordertype,
            //     asset_symbol:assetsymbol
            // }
        })
        dispatch({
            type:types.GET_ALL_ORDERS_SUCCESS,
            payload:response.data
        })
        console.log("order success",response.data)
    }catch(error){
        console.log("error",error)
        dispatch({
            type:types.GET_ALL_ORDERS_FAILURE,
            error:error.message
        })
    }
}