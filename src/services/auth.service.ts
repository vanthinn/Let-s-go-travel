import BaseURL from "../utils/http";
import { toastMessage } from "../utils/toastMessage";

const login = async (data: any) => {
    try {
        const res = await BaseURL.post('users/login', data);
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }
}

const signUp = async (data: any) => {
    try {
        const res = await BaseURL.post('users', data);
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }
}

const changePassword = async (data: any) => {
    try {
        const res = await BaseURL.patch('users/changepw', data);
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }
}

export { login, signUp, changePassword }