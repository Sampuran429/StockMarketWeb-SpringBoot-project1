

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, GETUSER_REQUEST, LOGIN_FAILURE, GETUSER_FAILURE, LOGIN_SUCCESS, GETUSER_SUCCESS,LOGOUT } from "./ActionType";



const initialstate={
    user:null,
    loading:false,
    error:null,
    jwt:null
}
const  authReducer=(state=initialstate,action)=>{
   switch (action.type) {
    case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GETUSER_REQUEST:
        return{...state,loading:true,error:null}
    
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
        return{...state,loading:false,error:null,jwt:action.payload}

    case GETUSER_SUCCESS:
        return {...state,user:action.payload,loading:false,error:null}
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GETUSER_FAILURE:
        return {...state,loading:false,error:action.payload};

    case LOGOUT:{
        return {...initialstate}
    }
    default:
        return state;
   }
}
export default authReducer;