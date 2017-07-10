/*
 * created by aditya on 7/7/17
 */

"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
    fetchLinks
} from "./../actions/LinkActions";
import {Row, Col} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";
import SortableComponent from "./SortableComponent";
import AddModulePopup from "./AddModulePopup";
import {getSections} from "./../actions/SectionActions";
import {
    fetchModules
} from "./../actions/ModuleActions";
import {browserHistory} from "react-router";
import Urls from "./../models/Urls";
import AddLinkPopup from "./AddLinkPopup";

class PublishModuleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModulePopup: false,
            addLinkPopup: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const {courseId} = this.props;
        if (courseId !== nextProps.courseId) {
            browserHistory.push(Urls.PUBLISH);
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.fetchLinks();
        this.props.fetchPublished(this.props.courseId);
        this.props.fetchSections(this.props.courseId);
    }

    render() {
        const {links, modules, isLoading, newLink, userRole, selectedModule, sections, l1s, courseId} = this.props;
        const {addModulePopup, addLinkPopup} = this.state;

        if (userRole === "contentWriter" || userRole === "reviewer") {
            return <NoAccessErrorComponent/>;
        }

        const styles = {
            pageTitle: {
                fontWeight: 400
            }
        };

        return (
            <div>
                <br/>
                <Row>
                    <Col xs={10}>
                        <h1 style={styles.pageTitle}>Publish (Link)</h1>
                    </Col>
                    <Col xs={2}>
                        {isLoading ? <CircularProgress size={32}/> : null}
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        {selectedModule.name}
                        <span onClick={this.toggleAddModulePopup.bind(this)}>edit</span>
                    </Col>
                </Row>

                <br/><br/>

                <Row>
                    <Col xs={12}>
                        <br/>
                        <RaisedButton primary={true} label="Add Link" onClick={this.toggleAddLinkPopup.bind(this)}/>
                    </Col>
                </Row>

                <br/><br/>

                <Row>
                    <Col xs={12}>
                        <SortableComponent onSortEnd={this.onSortEnd.bind(this)} items={modules}/>
                    </Col>
                </Row>

                {addModulePopup ?
                    <AddModulePopup showDialog={addModulePopup} onDialogClose={this.handleDialogClose.bind(this)}
                                    module={selectedModule} sections={sections} l1s={l1s} courseId={courseId}/> : null}
                {addLinkPopup ?
                    <AddLinkPopup/> : null}
            </div>
        );
    }

    toggleAddModulePopup() {
        this.setState({
            addModulePopup: !this.state.addModulePopup
        });
    }

    toggleAddLinkPopup() {
        this.setState({
            addLinkPopup: !this.state.addLinkPopup
        });
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.addModulePopup) {
                if (update) {
                    props.fetchLinks(props.selectedModule.id);
                }
                return {addModulePopup: false};
            }
            return prevState;
        });
    }

    onSortEnd(updatedOrder) {
        console.log(updatedOrder);
    }
}

PublishModuleComponent.propTypes = {
    links: PropTypes.array,
    modules: PropTypes.array,
    isLoading: PropTypes.bool,
    userRole: PropTypes.string,
    newLink: PropTypes.object,
    selectedModule: PropTypes.object,
    sections: PropTypes.array,
    l1s: PropTypes.array,
    courseId: PropTypes.string,
    fetchSections: PropTypes.func,
    fetchPublished: PropTypes.func,
    fetchLinks: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        ...state.links,
        ...state.sections,
        modules: state.modules.modules,
        selectedModule: state.modules.newModule,
        courseId: state.ContentReducer.selectedCourse.id,
        userRole: state.GlobalReducer.loggedInUser.role
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLinks: (moduleId, linkId) => {
            dispatch(fetchLinks(linkId));
        },

        fetchSections: (courseId) => {
            dispatch(getSections({courseId: courseId}));
        },

        fetchPublished: (courseId) => {
            dispatch(fetchModules(courseId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishModuleComponent);
