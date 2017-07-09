/**
 * Created by aditya on 7/7/17.
 */

"use strict";

import Link from "./../models/Link";
import {
    LINKS_HAS_ERRORED,
    LINKS_IS_LOADING,
    INIT_LINKS
} from "./../actions/ActionConstants";

let defaultNewLink = new Link({}).toJSON();

let defaultState = {
    links: [],
    newLink: defaultNewLink,
    isLoading: false,
    hasErrored: false,
    errorMessage: ""
};

export function LinksReducer(state = defaultState, action) {
    switch (action.type) {
        case LINKS_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case LINKS_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            };
        case INIT_LINKS:
            return {
                ...state,
                modules: action.links
            };
        default:
            return state;
    }
}
