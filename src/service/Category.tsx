import axios from 'axios';
import { config } from 'config/config';
import { response } from 'express';
import { addCategoryPayLoad } from 'Modal/Modal';
import { async } from 'q';

export const defaultHeader = {
    "content-type": "application/json",
    "API_KEY": config.API_KEY,
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