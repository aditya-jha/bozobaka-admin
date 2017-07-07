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
import {getSections} from "./../actions/SectionActions";

const mapStateToProps = (state) => {
    return {
        ...state.modules,
        courseId: state.ContentReducer.selectedCourse.id,
        userRole: state.GlobalReducer.loggedInUser.role,
        ...state.sections
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => {
            dispatch(fetchData());
        },

        fetchPublished: (courseId) => {
            dispatch(fetchModules(courseId));
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
        },

        fetchSections: (courseId) => {
            dispatch(getSections({courseId: courseId}));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishComponent);
