/*
 created by aditya on 17-02-2017
 */

"use strict";

import axios from "axios";
import {API_BASE} from "./../models/APIEndpoints";
import LoginService from "./LoginService";
import {browserHistory} from "react-router";

axios.interceptors.request.use((config) => {
    config.headers["Authorization"] = LoginService.getAccessToken();

    if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

export function makeRequest(config) {
    return axios.request({
        method: config.method || "get",
        baseURL: config.baseURL ? config.baseUrl : API_BASE,
        url: config.url,
        data: config.data,
        headers: config.headers ? config.headers : {},
        params: config.params,
        timeout: config.timeout ? config.timeout : 100000,
        cancelToken: config.cancelToken
    });
}

export function errorHandler(reject, err) {
    if (err.code === "ECONNABORTED") {
        return reject(err);
    }

    switch (err.response.status) {
        case 401:
            LoginService.logout();
            window.location.href = "/";
            break;
        default:
            return reject(err.response.data.error);
    }
    return reject(err.response.data.error);
}
