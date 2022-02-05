import axios from "axios";
import {authHeader, getToken} from "./auth";


axios.interceptors.request.use(function (config) {
    // console.log(config);
    config.crossDomain = true;
    if (!config.url.includes('auth')) {
        config.headers = {...config.headers, ...authHeader(getToken())}
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (response && response.data) {
        return response.data
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});