
import {
    PUBLISH_INIT_QUESTIONS,
    PUBLISH_INIT_THEORIES,
    PUBLISH_TYPE,
    PUBLISH_IS_LOADING,
    PUBLISH_HAS_ERRORED,
    PUBLISH_SORT_DIALOG,
    PUBLISH_RESET_STATE,
    PUBLISH_UPDATE_PUBLISHED,
    PUBLISH_PUBLISH_DIALOG
} from "./../actions/ActionConstants";

const defaultState = {
    published: [],
    questions: [],
    theories: [],
    isLoading: false,
    hasErrored: false,
    errorMessage: "",
    contentType: "question",
    sortDialog: false,
    publishDialog: false
};

export function PublishReducer(state = defaultState, action) {
    switch (action.type) {
        case PUBLISH_PUBLISH_DIALOG:
            return {
                ...state,
                publishDialog: action.publishDialog
            };
        case PUBLISH_UPDATE_PUBLISHED:
            return {
                ...state,
                published: action.published
            };
        case PUBLISH_TYPE:
            return {
                ...state,
                contentType: action.contentType
            };
        case PUBLISH_INIT_THEORIES: {
            return {
                ...state,
                theories: action.theories
            };
        }
        case PUBLISH_INIT_QUESTIONS: {
            return {
                ...state,
                questions: action.questions
            };
        }
        case PUBLISH_HAS_ERRORED: {
            return {
                ...state,
                hasErrored: action.hasErrored,
                errorMessage: action.errorMessage
            };
        }
        case PUBLISH_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            };
        }
        case PUBLISH_SORT_DIALOG:
            return {
                ...state,
                sortDialog: action.sortDialog
            };
        case PUBLISH_RESET_STATE:
            return defaultState;
        default:
            return state;
    }
}
