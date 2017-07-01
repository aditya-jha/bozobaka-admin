"use strict";

import {makeRequest, errorHandler} from "./APIService";
import {SOURCES} from "./../models/APIEndpoints";
import Source from "./../models/Source";

export function getSources() {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: "get",
            url: SOURCES
        }).then((response) => {
            resolve(Source.parseSources(response.data));
        }).catch((err) => errorHandler(reject, err));
    });
}

export function postSource(name) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: "post",
            url: SOURCES,
            data: {
                name
            }
        }).then((response) => {
            resolve(new Source(response.data));
        }).catch((err) => errorHandler(reject, err));
    });
}
