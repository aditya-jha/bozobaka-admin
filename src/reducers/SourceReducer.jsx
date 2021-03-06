"use strict";

import {
    INIT_SOURCES,
    DELETE_SOURCES,
    SOURCE_REQUEST_STATE,
    SOURCE_HAS_ERRORED,
    SOURCE_IS_LOADING,
    SOURCE_NAME,
    SOURCE_DIALOG_STATE,
    SOURCE_ADD_SOURCE
} from "./../actions/ActionConstants";

let defaultState = {
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    requestSuccess: false,
    sources: [],
    name: "",
    openDialog: false
};

export function SourceReducer(state = defaultState, action) {
    switch (action.type) {
        case INIT_SOURCES:
            return {
                ...state,
                sources: action.sources
            };
        case DELETE_SOURCES:
            return {
                ...state,
                sources: []
            };
        case SOURCE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SOURCE_REQUEST_STATE:
            return {
                ...state,
                requestSuccess: action.requestSuccess
            };
        case SOURCE_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            };
        case SOURCE_NAME:
            return {
                ...state,
                name: action.name
            };
        case SOURCE_DIALOG_STATE:
            return {
                ...state,
                openDialog: action.openDialog
            };
        case SOURCE_ADD_SOURCE:
            return {
                ...state,
                sources: [
                    ...state.sources,
                    action.source
                ]
            };
        default:
            return state;
    }
}

