import * as types from "./ActionType";
import api from "@/Config/api";

export const getUserWallet = (jwt) => async (dispatch) => {
    dispatch({ type: types.GET_USER_WALLET_REQUEST });
    try {
        const response = await api.get("/api/wallet", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        dispatch({
            type: types.GET_USER_WALLET_SUCCESS,
            payload: response.data,  // Assuming this contains the balance
        });
        console.log("userwallet", response.data);
        
        console.log("userwallet" ,response.data)
    } catch (error) {
        console.log(error);
        dispatch({
            type: types.GET_USER_WALLET_FAILURE,
            error: error.message,
        });
    }
};


export const getWalletTransactions=({jwt})=>async (dispatch)=>{
    dispatch({type:types.GET_WALLET_TRANSACTIONS_REQUEST})
    try{
        const response=await api.get("/api/transactions",{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({
            type:types.GET_WALLET_TRANSACTIONS_SUCCESS,
            payload:response.data
        })
        console.log("wallet transactions",response.data)
    }catch(error){
        console.log(error)
        dispatch({
            type:types.GET_WALLET_TRANSACTIONS_FAILURE,
            error:error.message
        })
    }
}

export const depositmoney=
({jwt,orderId,paymentId,navigate})=>async(dispatch)=>{
    dispatch({type:types.DEPOSIT_MONEY_REQUEST})
    try{
        const response=await api.put(`/api/wallet/deposit`,null,{
            params:{
                order_Id:orderId,
                payment_Id:paymentId
            },
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        console.log("-------------------------------",orderId,paymentId);
        dispatch({
            type:types.DEPOSIT_MONEY_SUCCESS,
            payload:response.data
        })
        navigate("/wallet")
        console.log(response.data)
    }catch(error){
        console.log(error)
        dispatch({
            type:types.DEPOSIT_MONEY_FAILURE,
            error:error.message
        })
    }
}

export const paymentHandler=({jwt,amount,paymentMethod})=> async (dispatch)=>{
    dispatch({type:types.DEPOSIT_MONEY_REQUEST})
    try{
        const response = await api.post(`/api/payment/${paymentMethod}/amount/${amount}`,
            null,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            }
        )
        window.location.href=response.data.payment_url
       
    }catch(error){
        console.log(error)
        dispatch({
            type:types.DEPOSIT_MONEY_FAILURE,
            error:error.message
        })
    }
}

export const transferMoney = ({ jwt, walletId, reqdata }) => async (dispatch) => {
    dispatch({ type: types.TRANSFER_MONEY_REQUEST });
    try {
        const response = await api.put(`/api/wallet/${walletId}/transfer`, reqdata, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({
            type: types.TRANSFER_MONEY_SUCCESS,
            payload: response.data,
        });
        console.log("transfer money sent", response.data);
    } catch (error) {
        dispatch({
            type: types.TRANSFER_MONEY_FAILURE,
            error: error.message,
        });
    }
};


