import axios from "axios";

export const ApibaseUrl="http://localhost:8081";

const api=axios.create({
    baseURL:ApibaseUrl,
    headers:{
        'Content-Type': 'application/json',
    }
})



export default api