import axios from 'axios';
export const baseURL = "http://127.0.0.1:3002";

function onSuccess(response) {
    return response;
}

function onFailure(error) {
    console.log(error);
    Promise.reject(error)
}

const customAxios = axios.create({
    baseURL,
    headers: {
        "access-token": localStorage.getItem("token")
    }
})

customAxios.interceptors.response.use(onSuccess, onFailure);

export default customAxios;