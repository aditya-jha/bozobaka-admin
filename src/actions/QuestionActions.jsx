"use strict";

import {
    QUESTION_IS_LOADING,
    QUESTION_HAS_ERRORED,
    QUESTION_REQUEST_SUCCESS,
    QUESTION_UPDATE_SECTION,
    QUESTION_UPDATE_L1,
    QUESTION_UPDATE_L2,
    QUESTION_UPDATE_L3,
    QUESTION_UPDATE_L4,
    QUESTION_UPDATE_SOURCE,
    QUESTION_UPDATE_QUESTION_TYPE,
    QUESTION_UPDATE_DIFFICULTY,
    QUESTION_UPDATE_STATUS,
    QUESTION_UPDATE_PARSED_QUESTION,
    INIT_QUESTIONS,
    QUESTION_RESET_STATE,
    QUESTION_UPDATE_ID,
    QUESTION_UPDATE_QUESTION,
    QUESTION_ADD_OPTION,
    QUESTION_UPDATE_OPTION,
    QUESTION_REMOVE_OPTION,
    QUESTION_UPDATE_SOLUTION,
    QUESTION_UPDATE_HINT
} from "./../actions/ActionConstants";
import {
    fetchQuestion as fetchQuestionRequest,
    updateQuestion as updateQuestionRequest
} from "./../services/QuestionService";
import {getQuestionFilter} from "./../actions/FilterActions";
import Question from "./../models/Question";

export function questionUpdateSource(sourceId) {
    return {
        type: QUESTION_UPDATE_SOURCE,
        sourceId
    };
}

export function questionHasErrored(hasErrored, errorMessage) {
    return {
        type: QUESTION_HAS_ERRORED,
        hasErrored,
        errorMessage
    };
}

export function questionIsLoading(isLoading) {
    return {
        isLoading,
        type: QUESTION_IS_LOADING
    };
}

export function questionRequestSuccess(requestSuccess) {
    return {
        type: QUESTION_REQUEST_SUCCESS,
        requestSuccess
    };
}

export function questionUpdateSection(sectionId) {
    return {
        type: QUESTION_UPDATE_SECTION,
        sectionId
    };
}

export function questionUpdateL1(l1Id) {
    return {
        type: QUESTION_UPDATE_L1,
        l1Id
    };
}

export function questionUpdateL2(l2Id) {
    return {
        type: QUESTION_UPDATE_L2,
        l2Id
    };
}

export function questionUpdateL3(l3Id) {
    return {
        type: QUESTION_UPDATE_L3,
        l3Id
    };
}

export function questionUpdateL4(l4Id) {
    return {
        type: QUESTION_UPDATE_L4,
        l4Id
    };
}

export function questionUpdateQuestionType(questionType) {
    return {
        type: QUESTION_UPDATE_QUESTION_TYPE,
        questionType
    };
}

export function questionUpdateDifficulty(difficulty) {
    return {
        type: QUESTION_UPDATE_DIFFICULTY,
        difficulty
    };
}

export function questionUpdateStatus(status) {
    return {
        type: QUESTION_UPDATE_STATUS,
        status
    };
}

export function questionUpdateParsedQuestion(parsedQuestion) {
    return {
        type: QUESTION_UPDATE_PARSED_QUESTION,
        parsedQuestion
    };
}

export function initQuestions(questions) {
    return {
        type: INIT_QUESTIONS,
        questions
    };
}

export function questionResetState() {
    return {
        type: QUESTION_RESET_STATE
    };
}

export function questionUpdateId(id) {
    return {
        type: QUESTION_UPDATE_ID,
        id
    };
}

export function questionUpdateQuestion(question) {
    return {
        type: QUESTION_UPDATE_QUESTION,
        question
    };
}

export function questionAddOption() {
    return {
        type: QUESTION_ADD_OPTION
    };
}

export function questionUpdateOption(index, option) {
    return {
        type: QUESTION_UPDATE_OPTION,
        index,
        option
    };
}

export function questionRemoveOption(index) {
    return {
        type: QUESTION_REMOVE_OPTION,
        index
    };
}

export function questionUpdateSolution(solution, parsedSolution) {
    return {
        type: QUESTION_UPDATE_SOLUTION,
        solution,
        parsedSolution
    };
}

export function questionUpdateHint(hint, parsedHint) {
    return {
        type: QUESTION_UPDATE_HINT,
        hint,
        parsedHint
    };
}

export function questionFetchQuestions(questionId) {
    return (dispatch, getState) => {
        dispatch(questionIsLoading(true));

        const filters = getQuestionFilter(getState());
        fetchQuestionRequest({
            id: questionId,
            filter: filters
        }).then((res) => {
            dispatch(initQuestions(res));
            dispatch(questionIsLoading(false));
            dispatch(questionRequestSuccess(true));
        }).catch((err) => {
            dispatch(questionIsLoading(false));
            dispatch(questionRequestSuccess(false));
            dispatch(questionHasErrored(true, err.message));
        });
    };
}

export function questionPostQuestion() {
    return (dispatch, getState) => {
        try {
            const state = getState();
            const data = Question.validateQuestion({
                ...state.question,
                courseId: state.ContentReducer.selectedCourse.id
            });
            data.courseId = state.ContentReducer.selectedCourse.id;
            if (status) {
                data.status = status;
            }

            dispatch(questionIsLoading(true));

            updateQuestionRequest({
                method: data.id ? "patch" : "post",
                data
            }).then((theory) => {
                console.log("question after post", theory);
                dispatch(questionUpdateId(theory.id));
                dispatch(questionIsLoading(false));
                dispatch(questionRequestSuccess(true));
            }).catch((err) => {
                dispatch(questionIsLoading(false));
                dispatch(questionRequestSuccess(false));
                dispatch(questionHasErrored(true, err.message));
            });
        } catch (err) {
            dispatch(questionHasErrored(true, err.message));
        }
    };
}
