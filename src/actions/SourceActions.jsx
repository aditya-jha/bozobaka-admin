"use strict";

import {
    INIT_SOURCES,
    DELETE_SOURCES,
    SOURCE_HAS_ERRORED,
    SOURCE_IS_LOADING,
    SOURCE_REQUEST_STATE,
    SOURCE_NAME,
    SOURCE_ADD_SOURCE,
    SOURCE_DIALOG_STATE
} from "./ActionConstants";
import {getSources, postSource as creatNewSource} from "./../services/SourceService";

export function initSources(sources) {
    // let parsedSources = [];
    // sources.forEach((source) => {
    //     parsedSources.push(source.name);
    // });
    return {
        type: INIT_SOURCES,
        sources: sources
    };
}

export function sourceUpdateName(name) {
    return {
        type: SOURCE_NAME,
        name
    };
}

export function deleteSources() {
    return {
        type: DELETE_SOURCES
    };
}

export function sourceIsLoading(isLoading) {
    return {
        type: SOURCE_IS_LOADING,
        isLoading
    };
}

export function sourceHasErrored(hasErrored, errorMessage) {
    return {
        type: SOURCE_HAS_ERRORED,
        hasErrored,
        errorMessage
    };
}

export function sourceRequestState(requestSuccess) {
    return {
        type: SOURCE_REQUEST_STATE,
        requestSuccess
    };
}

export function sourceAddSource(source) {
    return {
        type: SOURCE_ADD_SOURCE,
        source
    };
}

export function sourceDialogState(openDialog) {
    return {
        type: SOURCE_DIALOG_STATE,
        openDialog
    };
}

export function fetchSources() {
    return (dispatch) => {
        dispatch(sourceIsLoading(true));

        getSources().then((sources) => {
            dispatch(initSources(sources));
            dispatch(sourceHasErrored(false, ""));
            dispatch(sourceIsLoading(false));
            dispatch(sourceRequestState(true));
        }).catch((err) => {
            dispatch(sourceHasErrored(true, err.message));
            dispatch(sourceIsLoading(false));
            dispatch(sourceRequestState(false));
        });
    };
}

export function postSource() {
    return (dispatch, getState) => {
        let name = getState().sources.name;
        if (!name || !name.length) {
            return;
        }
        dispatch(sourceIsLoading(true));

        creatNewSource(name).then((source) => {
            dispatch(sourceAddSource(source));
            dispatch(sourceHasErrored(false, ""));
            dispatch(sourceIsLoading(false));
            dispatch(sourceRequestState(true));
        }).catch((err) => {
            dispatch(sourceHasErrored(true, err.message));
            dispatch(sourceIsLoading(false));
            dispatch(sourceRequestState(false));
        })
    }
}