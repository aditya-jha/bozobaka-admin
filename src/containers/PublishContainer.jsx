"use strict";

import {connect} from "react-redux";
import PublishComponent from "./../components/PublishComponent";
import {setStatus} from "./../actions/FilterActions";
import {
    fetchData,
    publishSortDialogStatus,
    updateRank,
    unpublish,
    resetState,
    fetchPublished
} from "./../actions/PublishActions";

const mapStateToProps = (state) => {
    return {
        ...state.publish,
        courseId: state.ContentReducer.selectedCourse.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(fetchData());
        },

        fetchPublished: () => {
            dispatch(fetchPublished());
        },

        updateStatusFilter: (status) => {
            dispatch(setStatus(status));
        },

        sortDialogStatus: (status) => {
            dispatch(publishSortDialogStatus(status || false));
        },

        updateSort: (item, rank) => {
            dispatch(updateRank(item, rank));
        },

        unpublish: (item) => {
            dispatch(unpublish(item));
        },

        clearData: () => {
            dispatch(resetState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishComponent);
