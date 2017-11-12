"use strict";

import {connect} from "react-redux";
import AddTheoryComponent from "./../components/AddTheoryComponent";
import {
    theoryUpdateHeading,
    theoryUpdateTheory,
    theoryUpdateParsedTheory,
    theoryResetState,
    theoryPostTheory,
    theoryFetchTheory,
    theoryHasErrored,
    theoryUpdateHeadingHindi,
    theoryUpdateParsedTheoryHindi,
    theoryUpdateTheoryHindi
} from "./../actions/TheoryActions";
import {parseKatex} from "./../services/KatexParser";

function userHasAccess(role) {
    let rolesWithAccess = ["admin", "superAdmin"];
    return (rolesWithAccess.indexOf(role) > -1);
}

const mapStateToProps = (state) => {
    const role = state.GlobalReducer.loggedInUser.role;
    return {
        hasAccess: userHasAccess(role),
        ...state.theory
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateHeading: (event, newValue) => {
            dispatch(theoryUpdateHeading(newValue));
        },

        updateHeadingHindi: (event, newValue) => {
            dispatch(theoryUpdateHeadingHindi(newValue));
        },

        updateTheoryHindi: (newValue) => {
            setTimeout(() => {
                let parsedHtml = parseKatex(newValue);
                dispatch(theoryUpdateParsedTheoryHindi(parsedHtml));
            }, 0);
            dispatch(theoryUpdateTheoryHindi(newValue));
        },

        updateTheory: (newValue) => {
            setTimeout(() => {
                let parsedHtml = parseKatex(newValue);
                dispatch(theoryUpdateParsedTheory(parsedHtml));
            }, 0);
            dispatch(theoryUpdateTheory(newValue));
        },

        resetState: () => {
            dispatch(theoryResetState());
        },

        postTheory: (status) => {
            dispatch(theoryPostTheory(status));
        },

        fetchTheory: (id) => {
            dispatch(theoryFetchTheory(id));
        },

        resetErrorState: () => {
            dispatch(theoryHasErrored(false, ""));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTheoryComponent);
