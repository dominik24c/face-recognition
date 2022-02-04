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
    // Do something with request error
    return Promise.reject(error);
});