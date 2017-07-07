/**
 * Created by aditya on 1/7/17.
 */

"use strict";

import {fetchModules as fetchModulesRequest} from "./../services/PublishService";

import {
    MODULES_HAS_ERRORED,
    MODULES_IS_LOADING,
    INIT_MODULES
} from "./ActionConstants";

export function moduleHasErrored(hasErrored, errorMessage) {
    return {
        type: MODULES_HAS_ERRORED,
        hasErrored: hasErrored,
        errorMessage: errorMessage
    };
}

export function moduleIsLoading(isLoading) {
    return {
        type: MODULES_IS_LOADING,
        isLoading
    };
}

export function initModules(modules) {
    return {
        type: INIT_MODULES,
        modules
    };
}

export function fetchModules(courseId, moduleId) {
    return (dispatch) => {
        dispatch(moduleIsLoading(true));

        fetchModulesRequest(courseId, moduleId)
            .then(res => {
                dispatch(moduleIsLoading(false));
                dispatch(initModules(res));
            })
            .catch(err => {
                dispatch(moduleIsLoading(false));
                dispatch(moduleHasErrored(true, err.message));
            });
    };
}
