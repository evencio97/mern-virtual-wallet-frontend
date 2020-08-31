import axios from 'axios';

export const axiosClient= axios.create({
    baseURL: process.env.REACT_APP_API_URL
})
export const headers = { 'Content-Type': 'application/json' };

export default { axiosClient, headers };