import BaseURL from "../utils/http";
import { toastMessage } from "../utils/toastMessage";

const getProfile = async () => {
    try {
        const res = await BaseURL.get('users/profile');
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }
}

const updateProfile = async (data: any) => {
    try {
        const res = await BaseURL.patch('users/profile', { ...data });
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }
}

const getHistory = async () => {
    try {
        const res = await BaseURL.get('history');
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }
}



export { getProfile, updateProfile, getHistory }