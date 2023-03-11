
import axios from 'axios';
import { config } from 'config/config';
import { ExpenseState } from 'Modal/Modal';

export const defaultHeader = {
    "content-type": "application/json",
    "API_KEY": config.FIREBASE_API_KEY,
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Origin": "*"
}
export const addExpense = async (payload: ExpenseState, userId: string) => {
    try {
        const url = config.baseURL + 'expense' + userId + ".json"
        const response = await axios.post(url, payload);

        if (response.status === 200) {
            return true
        }
        return response?.data
    } catch (error) {
        return error
    }
}

export const getExpenses = async (userId: string) => {
    try {
        const url = config.baseURL + 'expense' + userId + ".json"
        const response = await axios.get(url);

        if (response.status === 200) {
            return response?.data
        }
        return response?.data?.message
    } catch (error) {
        return error
    }
}

export const updateExpense = async (userId: string, expenseId: string, payload: ExpenseState) => {
    try {
        /**
    * My url like category + userId +"/" + firebase alphabetical key +".json"
    * if you use fetch then add put into method or use  axios use axios.put
    */
        const url = config.baseURL + 'expense' + userId + "/" + expenseId + ".json"
        const response = await axios.put(url, payload);
        if (response.status === 200) {
            return response.data
        }
        return response?.data?.message
    } catch (error) {
        return error
    }
}
export const deleteExpense = async (userId: string, expenseId: string) => {
    try {
        /**
         * My url like category + userId +"/" + firebase alphabetical key +".json"
         * if you use fetch then add delete into method or use  axios use axios.delete
         */
        const url = config.baseURL + 'expense' + userId + "/" + expenseId + ".json";
        const response = await axios.delete(url);

        if (response.status === 200) {
            return response
        }
        return response?.data?.message
    } catch (error) {
        return error
    }
}
