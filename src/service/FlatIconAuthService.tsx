import axios from "axios";
import { api } from "config/api";
import { config } from "config/config";
import { setItem } from "helper/Storage";

export const getAccessToken = async () => {
    try {
        const payload = {
            apikey: config.ICONE_API_KEY
        }
        const response = await axios.post(config.iconeBaseURL + api.flatIconAuth.authentication, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        })
        if (response.status === 200) {
            setItem("flatIconToken", response.data?.data)
        }

    } catch (error) {
        return error
    }
}