import axios from "axios";
import { GETUSER_FAILURE, GETUSER_REQUEST, GETUSER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";

export const register = (userdata) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  const baseUrl = "http://localhost:8081";

  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, userdata);
    const user = response.data;
    console.log(user);

    dispatch({ type: REGISTER_SUCCESS, payload: user.jwt });
    localStorage.setItem("jwt", user.jwt);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    console.log(error);
  }
};



export const login = (userdata) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
  
    const baseUrl = "http://localhost:8081";
  
    try {
      const response = await axios.post(`${baseUrl}/auth/signin`, userdata.data);
      const user = response.data;
      console.log(user);
  
      dispatch({ type: LOGIN_SUCCESS, payload: user.jwt });
      localStorage.setItem("jwt", user.jwt);
      userdata.navigate("/")
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      console.log(error);
    }
  };


  export const getuser = (jwt) => async (dispatch) => {
    dispatch({ type: GETUSER_REQUEST });
  
    const baseUrl = "http://localhost:8081"; // Make sure this URL is correct.
  
    try {
      const response = await axios.get(`${baseUrl}/api/users/profile`, {  // Add `/` between baseUrl and api.
        headers: {
          Authorization: `Bearer ${jwt}`,  // Ensure a space after `Bearer`.
        },
      });
      const user = response.data;
      console.log(user);
  
      dispatch({ type: GETUSER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: GETUSER_FAILURE, payload: error.message });
      console.log(error);
    }
  };
  
export const logout=()=>async(dispatch)=>{
  localStorage.clear();
  dispatch({type:LOGOUT})
}


