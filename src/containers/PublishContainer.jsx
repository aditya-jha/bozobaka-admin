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
    publishPublishDialogStatus
} from "./../actions/PublishActions";
import {
    fetchModules
} from "./../actions/ModuleActions";


const mapStateToProps = (state) => {
    return {
        ...state.publish,
        courseId: state.ContentReducer.selectedCourse.id,
        userRole: state.GlobalReducer.loggedInUser.role
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(fetchData());
        },

        fetchPublished: () => {
            dispatch(fetchModules());
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
        },

        publishDialogStatus: (status) => {
            dispatch(publishPublishDialogStatus(status || false));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishComponent);
