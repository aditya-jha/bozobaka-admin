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

export function publishUpdatePublished(published) {
    return {
        type: PUBLISH_UPDATE_PUBLISHED,
        published
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

export function publishSortDialogStatus(sortDialog) {
    return {
        type: PUBLISH_SORT_DIALOG,
        sortDialog
    };
}

export function publishPublishDialogStatus(publishDialog) {
    return {
        type: PUBLISH_PUBLISH_DIALOG,
        publishDialog
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

export function fetchPublished() {
    return (dispatch, getState) => {
        dispatch(publishIsLoading(true));

        const state = getState();
        const filter = {
            order: "rank ASC"
        };
        if (state.publish.contentType) {
            filter.where = {
                entityType: state.publish.contentType,
                status: "publish"
            };
        }
        makeRequest({
            url: "courses/" + state.ContentReducer.selectedCourse.id + "/publish",
            params: {
                filter: JSON.stringify(filter)
            }
        }).then(res => {
            let published = [];
            res.data.forEach((data) => {
                let item = data.question ? new Question(data) : new Theory(data);
                published.push(item);
            });
            dispatch(publishUpdatePublished(published));
            dispatch(publishIsLoading(false));
        }).catch(err => {
            dispatch(publishIsLoading(false));
            dispatch(publishHasErrored(true, err.message));
        });
    };
}

export function updateRank(item, rank) {
    return (dispatch, getState) => {
        dispatch(publishIsLoading(true));

        const state = getState();
        ContentService.updateRank({
            courseId: state.ContentReducer.selectedCourse.id,
            id: item.id,
            currentRank: rank,
            type: item.question ? "question" : "theory"
        }).then(res => {
            dispatch(fetchPublished());
        }).catch((err) => {
            dispatch(publishIsLoading(false));
            dispatch(publishHasErrored(true, err.message));
        });
    };
}

export function unpublish(item) {
    return (dispatch) => {
        dispatch(publishIsLoading(true));

        const params = {
            method: "patch",
            data: {
                status: "accept",
                rank: 0,
                id: item.id
            }
        };

        let request = item.question ? updateQuestion(params) : updateTheory(params);
        request.then(() => {
            dispatch(fetchPublished());
        }).catch(err => {
            dispatch(publishIsLoading(false));
            dispatch(publishHasErrored(true, err.message));
        });
    };
}

export function publishItem(item, rank) {
    return (dispatch) => {
        dispatch(publishIsLoading(true));

        const params = {
            method: "patch",
            data: {
                status: "publish",
                rank: rank,
                id: item.id
            }
        };

        let request = item.question ? updateQuestion(params) : updateTheory(params);
        request.then(() => {
            dispatch(fetchPublished());
        }).catch(err => {
            dispatch(publishIsLoading(false));
            dispatch(publishHasErrored(true, err.message));
        });
    };
}