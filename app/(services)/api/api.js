import axios from "axios";
 import { loadUserFromStorage } from "../../(redux)/authSlice";

const base_url = process.env.BACKEND_API; 

//login
export const loginUser = async ({email, password}) => {
    
    const response = await axios.post(`${base_url}/auth/login`, {email, password});
    //return promise
    return response.data
}

//register
export const registerUser = async ({username,email, password}) => {
    const response = await axios.post(`${base_url}/auth/register`, {username,email, password});
    //return promise
    return response.data
}

export const fetchLocation = async () => {
    const {token}  =  await loadUserFromStorage()
    
    try {
        const response = await axios.get(
            `${base_url}/location/latest`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }   
            }

        );
        
   
        return response.data

    } catch (error) {
        console.log(error)
    }
}

export const fetchDailySummary = async () => {
    const {token}  =  await loadUserFromStorage()
    
    try {
        const response = await axios.get(`${base_url}/stats/daily`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
   
        return response.data

    } catch (error) {
        console.log(error)
    }
}