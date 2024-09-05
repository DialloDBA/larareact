import axios from "axios";

const axiosClient = axios.create({
    baseURL : `${import.meta.env.VITE_AXIOS_CLIENT_URL}/${import.meta.env.VITE_AXIOS_CLIENT_URL_PREFIX}`

});

axiosClient.interceptors.request.use ((config)=>{
    const token = localStorage.getItem('USER_ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
axiosClient.interceptors.response.use((response)=>{
    return response;
},(error)=>{
    const {response} = error;
    if(response.status===401){
        localStorage.removeItem("USER_ACCESS_TOKEN")
    }
    throw error;
});

export default axiosClient;