/**
 * Created by aditya on 7/7/17.
 */

"use strict";

import {
    LINKS_HAS_ERRORED,
    LINKS_IS_LOADING,
    INIT_LINKS
} from "./ActionConstants";
import {
    fetchLinks as fetchLinksRequest
} from "./../services/PublishService";

export function linkHasErrored(hasErrored, errorMessage) {
    return {
        type: LINKS_HAS_ERRORED,
        hasErrored: hasErrored,
        errorMessage: errorMessage
    };
}

export function linkIsLoading(isLoading) {
    return {
        type: LINKS_IS_LOADING,
        isLoading
    };
}

export function initLinks(links) {
    return {
        type: INIT_LINKS,
        links
    };
}

export function fetchLinks(moduleId, linkId) {
    return (dispatch) => {
        dispatch(linkIsLoading(true));

        fetchLinksRequest(moduleId, linkId)
            .then(res => {
                dispatch(linkIsLoading(false));
                dispatch(initLinks(res));
                dispatch(linkHasErrored(false, ""));
            })
            .catch(err => {
                dispatch(linkIsLoading(false));
                dispatch(linkHasErrored(true, err.message));
            });
    };
}
