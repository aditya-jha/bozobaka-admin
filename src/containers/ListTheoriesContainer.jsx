"use strict";

import {connect} from "react-redux";
import ListTheoryComponent from "./../components/ListTheoryComponent";
import {theoryFetchTheory, theoryResetState} from "./../actions/TheoryActions";

const mapStateToProps = (state) => {
    return {
        theories: state.theory.theories,
        isLoading: state.theory.isLoading,
        courseId: state.ContentReducer.selectedCourse.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTheories: () => {
            dispatch(theoryFetchTheory());
        },

        onFilterChange: () => {
            dispatch(theoryFetchTheory());
        },

        resetState: () => {
            dispatch(theoryResetState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTheoryComponent);
