/**
 * Created by aditya on 1/7/17.
 */

"use strict";

import {makeRequest, errorHandler} from "./APIService";
import Module from "./../models/Module";
import {
    getModulesEndpoint
} from "./../models/APIEndpoints";

export function fetchModules(courseId, moduleId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            url: getModulesEndpoint(courseId, moduleId)
        }).then(res => {
            resolve(Module.parseModules(res.data));
        }).catch(err => errorHandler(reject, err));
    });
}

export function updateModules(courseId, module, config) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: config.method,
            url: getModulesEndpoint(courseId, module.id),
            data: module
        }).then(res => {
            (config.method !== "delete") ? resolve(new Module(res.data)) : resolve(res.data);
        }).catch(err => errorHandler(reject, err));
    });
}

