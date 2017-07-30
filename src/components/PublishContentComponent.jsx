/*
 * created by aditya on 9/7/17
 */

"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {fetchModules, deleteLinkEntity, updateOrder} from "./../actions/ModuleActions";
import {Col, Row} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import CircularProgress from "material-ui/CircularProgress";
import RaisedButton from "material-ui/RaisedButton";
import AddLinkPopup from "./AddLinkPopup";
import {browserHistory} from "react-router";
import Urls from "../models/Urls";
import PublishPopup from "./PublishingPopupComponent";
import SortableListItem from "./SortablePublishContentItemComponent";
import Reorder from "react-reorder";

class PublishContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addContentPopup: false,
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
        const {module, link} = this.props.location.query;
        if (!module || !link) {
            browserHistory.push(Urls.PUBLISH);
        }
        this.props.fetchModules(this.props.courseId, module);
    }

    render() {
        const {isLoading, userRole, modules, courseId} = this.props;
        const {addContentPopup, addLinkPopup} = this.state;

        if (userRole === "contentWriter" || userRole === "reviewer") {
            return <NoAccessErrorComponent/>;
        }

        const selectedModule = modules[0];
        if (!selectedModule) {
            return null;
        }

        const selectedLink = selectedModule.links.filter(link => link.id === this.props.location.query.link)[0];
        if (!selectedLink) {
            return null;
        }
        const linkEntities = selectedLink.linkEntities || [];

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
                        {selectedLink.name}
                        <span onClick={this.toggleAddLinkPopup.bind(this)}> <u>edit</u></span>
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col xs={12}>
                        <RaisedButton primary={true} label="Add Content"
                                      onClick={this.toggleAddContentPopup.bind(this)}/>
                    </Col>
                </Row>

                <br/><br/>

                <Row>
                    <Col xs={12}>
                        <Reorder itemKey="id" lock="horizontal" holdTime="200" list={linkEntities} template={SortableListItem}
                                 callback={this.onSortEnd.bind(this)} itemClicked={this.onSortableItemClick.bind(this)}/>
                    </Col>
                </Row>

                {addLinkPopup ?
                    <AddLinkPopup showDialog={addLinkPopup} onDialogClose={this.handleDialogClose.bind(this)}
                                  link={selectedLink} module={selectedModule} courseId={courseId}/> : null}
                {addContentPopup ? <PublishPopup openDialog={addContentPopup} linkId={selectedLink.id}
                                                 handleDialogClose={this.handleDialogClose.bind(this)}
                                                 publishedItems={linkEntities}
                                                 rankToSet={linkEntities.length + 1}/> : null}
            </div>
        );
    }

    onSortableItemClick(event, entity) {
        if (event.target.className === "publishContentDeleteButton") {
            // delete this linkEntity
            this.props.deleteLinkEntity(entity, this.props.courseId, this.props.location.query.module);
        }
    }

    toggleAddContentPopup() {
        this.setState({
            addContentPopup: !this.state.addContentPopup
        });
    }

    toggleAddLinkPopup() {
        this.setState({
            addLinkPopup: !this.state.addLinkPopup
        });
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.addContentPopup) {
                if (update) {
                    props.fetchModules(props.courseId, this.props.location.query.module);
                }
                return {addContentPopup: false};
            }
            return prevState;
        });
    }

    onSortEnd(event, entity, x, y, updatedItems) {
        this.props.updateOrder({
            linkId: this.props.location.query.link,
            entityOrder: updatedItems.map(item => item.id)
        });
    }
}

PublishContentComponent.propTypes = {
    isLoading: PropTypes.bool,
    userRole: PropTypes.string,
    courseId: PropTypes.string,
    fetchModules: PropTypes.func,
    location: PropTypes.object,
    modules: PropTypes.array,
    deleteLinkEntity: PropTypes.func,
    updateOrder: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        ...state.modules,
        courseId: state.ContentReducer.selectedCourse.id,
        userRole: state.GlobalReducer.loggedInUser.role
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchModules: (courseId, moduleId) => {
            dispatch(fetchModules(courseId, moduleId));
        },

        deleteLinkEntity: (entity, courseId, moduleId) => {
            dispatch(deleteLinkEntity(entity.id, courseId, moduleId));
        },

        updateOrder: (data) => {
            dispatch(updateOrder(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishContentComponent);
