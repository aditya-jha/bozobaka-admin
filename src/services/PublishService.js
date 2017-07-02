/**
 * Created by aditya on 1/7/17.
 */

"use strict";

import {makeRequest, errorHandler} from "./APIService";
import Module from "./../models/Module";
import {
    MODULES
} from "./../models/APIEndpoints";

export function fetchModules(moduleId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            url: moduleId ? MODULES + "/" + moduleId : MODULES
        }).then(res => {
            resolve(Module.parseModules(res.data));
        }).catch(err => errorHandler(reject, err));
    });
}

export function updateModules(module, config) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: config.method,
            url: config.method === "post" ? MODULES : MODULES + "/" + module.id,
            data: module
        }).then((res) => {
            (config.method !== "delete") ? resolve(new Module(res.data)) : resolve(res.data);
        }).catch((err) => errorHandler(reject, err));
    });
}
