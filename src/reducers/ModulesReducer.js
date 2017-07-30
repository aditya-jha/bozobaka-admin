/**
 * Created by aditya on 2/7/17.
 */

"use strict";

import {
    MODULES_HAS_ERRORED,
    MODULES_IS_LOADING,
    INIT_MODULES
} from "./../actions/ActionConstants";
import Module from "./../models/Module";

const defaultNewModule = new Module({}).toJSON();

const defaultState = {
    modules: [],
    newModule: defaultNewModule,
    isLoading: false,
    hasErrored: false,
    errorMessage: ""
};


export function ModulesReducer(state = defaultState, action) {
    switch (action.type) {
        case MODULES_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case MODULES_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            };
        case INIT_MODULES:
            return {
                ...state,
                modules: action.modules
            };
        default:
            return state;
    }
}
