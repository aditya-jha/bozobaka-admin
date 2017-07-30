"use strict";

import {
    PUBLISH_HAS_ERRORED,
    PUBLISH_INIT_QUESTIONS,
    PUBLISH_INIT_THEORIES,
    PUBLISH_IS_LOADING,
    PUBLISH_TYPE,
    PUBLISH_SORT_DIALOG,
    PUBLISH_RESET_STATE,
    PUBLISH_UPDATE_PUBLISHED,
    PUBLISH_PUBLISH_DIALOG
} from "./ActionConstants";

import {publishLinkEntity} from "./../services/PublishService";
import ContentService from "./../services/ContentService";
import {fetchQuestion, updateQuestion} from "./../services/QuestionService";
import {getQuestionFilter, getTheoryFilter} from "./FilterActions";
import {fetchTheory, updateTheory} from "./../services/TheoryService";
import {makeRequest} from "./../services/APIService";
import Theory from "./../models/Theory";
import Question from "./../models/Question";

export function publishHasErrored(hasErrored, errorMessage) {
    return {
        type: PUBLISH_HAS_ERRORED,
        hasErrored,
        errorMessage
    };
}

export function publishInitQuestions(questions) {
    return {
        type: PUBLISH_INIT_QUESTIONS,
        questions
    };
}

export function publishInitTheories(theories) {
    return {
        type: PUBLISH_INIT_THEORIES,
        theories
    };
}

export function publishContentType(contentType) {
    return {
        type: PUBLISH_TYPE,
        contentType
    };
}

export function publishIsLoading(isLoading) {
    return {
        type: PUBLISH_IS_LOADING,
        isLoading
    };
}

export function resetState() {
    return {
        type: PUBLISH_RESET_STATE
    };
}

export function fetchData() {
    return (dispatch, getState) => {
        dispatch(publishIsLoading(true));

        const state = getState();

        if (state.publish.contentType === "question") {
            const filter = getQuestionFilter(state);
            filter.status = "accept";

            fetchQuestion({
                filter,
                order: "rank ASC"
            }).then(questions => {
                console.log(questions);
                dispatch(publishInitQuestions(questions));
                dispatch(publishIsLoading(false));
            }).catch(err => {
                dispatch(publishIsLoading(false));
                dispatch(publishHasErrored(true, err.message));
            });
        } else {
            const filter = getTheoryFilter(state);
            filter.status = "accept";

            fetchTheory({
                filter: filter,
                order: "rank ASC"
            }).then(theories => {
                console.log(theories);
                dispatch(publishInitTheories(theories));
                dispatch(publishIsLoading(false));
            }).catch(err => {
                dispatch(publishIsLoading(false));
                dispatch(publishHasErrored(true, err.message));
            });
        }
    };
}

export function publishItem(item, linkId) {
    return (dispatch) => {
        dispatch(publishIsLoading(true));

        publishLinkEntity(linkId, item)
            .then(res => {
                dispatch(publishIsLoading(false));
                fetchData();
            }).catch(err => {
                dispatch(publishIsLoading(false));
                dispatch(publishHasErrored(true, err.message));
            });
    };
}
