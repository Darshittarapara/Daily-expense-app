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

export const getCategory = async (userId: string) => {
    try {
        const url = config.baseURL + 'category' + userId + ".json"
        const response = await axios.get(url);

        if (response.status === 200) {
            return response?.data
        }
        console.log(response.data)
        return response?.data?.message
    } catch (error) {
        return error
    }
}

export const deleteCategory = async (userId: string, categoryId: string) => {
    try {
        const url = config.baseURL + 'category' + userId + "/" + categoryId + ".json"
        console.log(url)
        const response = await axios.delete(url);

        if (response.status === 200) {
            return response
        }
        return response?.data?.message
    } catch (error) {
        return error
    }
}

export const searchCategoryIcon = async (token: string, query: string) => {
    try {
        const API_URL = config.serchBaseURL + "?q=" + query
        const response = await axios.get(API_URL, {
            headers: {
                'Accept': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.status === 200) {

            return response.data?.data?.[0]?.images?.[24];
        }

    } catch (error) {
        return error
    }
}

