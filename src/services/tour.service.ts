import BaseURL from "../utils/http"
import { toastMessage } from "../utils/toastMessage"

const getAllTour = async (params: any) => {
    try {
        const res = await BaseURL.get('tourist', { params: params })
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }

}

const getTourById = async (id: any) => {
    try {
        const res = await BaseURL.get('tourist/' + id)
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }

}

const rating = async (data: any) => {
    try {
        const res = await BaseURL.patch('rating', data)
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }

}

const recommend = async () => {
    try {
        const res = await BaseURL.get('recommend')
        return res.data
    } catch (error: any) {
        toastMessage(String(error?.response?.data.message || error?.message), 'error')
    }

}

export { getAllTour, getTourById, rating, recommend }