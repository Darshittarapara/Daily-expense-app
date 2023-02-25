import axios from 'axios';
import { config } from 'config/config';
import { addCategoryPayLoad } from 'Modal/Modal';


export const defaultHeader = {
    "content-type": "application/json",
    "API_KEY": config.FIREBASE_API_KEY,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Origin": "*"
}
export const addCategory = async (payload: addCategoryPayLoad, userId: string) => {
    try {
        const url = config.baseURL + 'category' + userId + ".json"
        const response = await axios.post(url, payload);
    
        if (response.status === 200) {
            return true
        }
        return response?.data
    } catch (error) {
        return error
    }
}

export const getCategory = async (userId:string) => {
    try {
        const url = config.baseURL + 'category' + userId + ".json"
        const response = await axios.get(url);
        console.log(response)
        if (response.status === 200) {
            return response?.data
        }
        return response?.data?.message
    } catch (error) {
        return error
    }
}

export const getIndividualCategory = async (userId:string, categoryId:string) => {
    try {
        const url = config.baseURL + 'category' + userId  + ".json/" +categoryId
        const response = await axios.delete(url);
        console.log(response)
        if (response.status === 200) {
            return response?.data
        }
        return response?.data?.message
    } catch (error) {
        return error
    }
}

export const searchCategoryIcon = async (query:string) => {
    try {
       const API_URL = config.iconeBaseURL + "/search?query=" +  query
       const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${config.ICONE_API_KEY}`,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      };
      
    //   const response = await fetch(API_URL, options)
    //   return await response.json()
        const response = await axios.get(API_URL, {
            headers : {
                accept: 'application/json',
                Authorization:`Bearer ${config.ICONE_API_KEY}`
            }
        });
        console.log(response)
        if (response.status === 200) {
            return response?.data
        }
       
    } catch (error) {
        return error
    }
}