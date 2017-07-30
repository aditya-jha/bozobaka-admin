/**
 * Created by aditya on 1/7/17.
 */

"use strict";

import {
    fetchModules as fetchModulesRequest,
    deleteLinkEntity as deleteLinkEntityRequest,
    updateOrder as updateOrderRequest
} from "./../services/PublishService";

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
                if (res.constructor === Array) {
                    dispatch(initModules(res));
                } else {
                    dispatch(initModules([res]));
                }
            })
            .catch(err => {
                dispatch(moduleIsLoading(false));
                dispatch(moduleHasErrored(true, err.message));
            });
    };
}

export function deleteLinkEntity(entityId, courseId, moduleId) {
    return (dispatch) => {
        dispatch(moduleIsLoading(true));

        deleteLinkEntityRequest(entityId)
            .then(() => fetchModulesRequest(courseId, moduleId))
            .then(res => {
                dispatch(moduleIsLoading(false));
                if (res.constructor === Array) {
                    dispatch(initModules(res));
                } else {
                    dispatch(initModules([res]));
                }
            })
            .catch(err => {
                dispatch(moduleIsLoading(false));
                dispatch(moduleHasErrored(true, err.message));
            });
    };
}

export function updateOrder(data) {
    return (dispatch) => {
        dispatch(moduleIsLoading(true));

        updateOrderRequest(data)
            .then(res => {
                dispatch(moduleIsLoading(false));
            })
            .catch(err => {
                dispatch(moduleIsLoading(false));
                dispatch(moduleHasErrored(true, err.message));
            });
    };
}
