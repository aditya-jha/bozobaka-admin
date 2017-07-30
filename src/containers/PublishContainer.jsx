"use strict";

import {connect} from "react-redux";
import PublishComponent from "./../components/PublishComponent";
import {setStatus} from "./../actions/FilterActions";
import {
    fetchData,
    resetState
} from "./../actions/PublishActions";
import {
    fetchModules,
    updateOrder
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

        clearData: () => {
            dispatch(resetState());
        },

        fetchSections: (courseId) => {
            dispatch(getSections({courseId: courseId}));
        },

        updateOrder: (data) => {
            dispatch(updateOrder(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishComponent);
