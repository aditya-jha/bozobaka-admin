"use strict";

import {makeRequest, errorHandler} from "./APIService";
import {QUESTIONS} from "./../models/APIEndpoints";
import Question from "./../models/Question";

export function updateQuestion(params) {
    return new Promise((resolve, reject) => {
        const url = params.method === "post" ? QUESTIONS : QUESTIONS + "/" + params.data.id;
        makeRequest({
            method: params.method,
            url: url,
            data: params.data
        }).then(res => {
            console.log("question post data", res);
            resolve(new Question(res.data));
        }).catch(err => errorHandler(reject, err));
    });
}

export function fetchQuestion(params) {
    return new Promise((resolve, reject) => {
        const url = params.id ? QUESTIONS + "/" + params.id : QUESTIONS;
        makeRequest({
            url,
            params: {
                filter: JSON.stringify({
                    where: params.filter,
                    order: params.order
                })
            }
        }).then(res => {
            if (typeof res.data === "object" && res.data.constructor === Array) {
                resolve(Question.parseQuestions(res.data));
            } else {
                resolve(new Question(res.data));
            }
        }).catch(err => errorHandler(reject, err));
    });
}
