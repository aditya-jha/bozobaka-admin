/*
 * created by aditya on 9/7/17
 */

"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {
    fetchLinks
} from "../actions/LinkActions";
import {Row, Col} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";
import SortableComponent from "./SortableComponent";
import {getSections} from "../actions/SectionActions";
import {
    fetchModules
} from "../actions/ModuleActions";
import {browserHistory} from "react-router";
import Urls from "../models/Urls";
import PublishPopup from "./PublishingPopupComponent";

class PublishContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addContentPopup: false
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
        const {links, contents, isLoading, userRole, selectedLink, courseId} = this.props;
        const {addContentPopup} = this.state;

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
                        <h1 style={styles.pageTitle}>Publish (Content)</h1>
                    </Col>
                    <Col xs={2}>
                        {isLoading ? <CircularProgress size={32}/> : null}
                    </Col>
                </Row>

                <br/><br/>

                <Row>
                    <Col xs={12}>
                        <br/>
                        <RaisedButton primary={true} label="Add Content" onClick={this.toggleAddContentPopup.bind(this)}/>
                    </Col>
                </Row>

                <br/><br/>

                <Row>
                    <Col xs={12}>
                        <SortableComponent onSortEnd={this.onSortEnd.bind(this)} items={contents}/>
                    </Col>
                </Row>

                {addContentPopup ? <PublishPopup rankToSet={this.selectedItem.rank + 1}/> : null}
            </div>
        );
    }

    toggleAddContentPopup() {
        this.setState({
            addContentPopup: !this.state.addContentPopup
        });
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.addContentPopup) {
                if (update) {
                    props.fetchContent(props.selectedModule.id);
                }
                return {addContentPopup: false};
            }
            return prevState;
        });
    }

    onSortEnd(updatedOrder) {
        console.log(updatedOrder);
    }
}

PublishContentComponent.propTypes = {
    links: PropTypes.array,
    contents: PropTypes.array,
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
        selectedLink: state.links.newLink,
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

export default connect(mapStateToProps, mapDispatchToProps)(PublishContentComponent);
