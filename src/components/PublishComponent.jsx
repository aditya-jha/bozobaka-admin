"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import PublishPopup from "./PublishingPopupComponent";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import AddModulePopup from "./AddModulePopup";
import Reorder from "react-reorder";
import SortableListItem from "./SortableListItem";
import {browserHistory} from "react-router";
import Urls from "./../models/Urls";

export default class PublishComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModulePopup: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchPublished} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchPublished();
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.fetchPublished(this.props.courseId);
        this.props.fetchSections(this.props.courseId);
    }

    render() {
        const {sections, l1s, isLoading, userRole, newModule, modules, courseId} = this.props;
        const {addModulePopup} = this.state;

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
                        <h1 style={styles.pageTitle}>Publish (Module)</h1>
                    </Col>
                    <Col xs={2}>
                        {isLoading ? <CircularProgress size={32}/> : null}
                    </Col>
                </Row>

                <br/>

                <Row>
                    <Col xs={12}>
                        <RaisedButton primary={true} label="Add Module" onClick={this.toggleAddModulePopup.bind(this)}/>
                    </Col>
                </Row>

                <br/><br/>

                <Row>
                    <Col xs={12}>
                        <Reorder itemKey="id" lock="horizontal" holdTime="200" list={modules} template={SortableListItem}
                                 callback={this.onSortEnd.bind(this)} itemClicked={this.onSortableItemClick}
                        />
                    </Col>
                </Row>

                {addModulePopup ?
                    <AddModulePopup showDialog={addModulePopup} onDialogClose={this.handleDialogClose.bind(this)}
                                    rankToSet={modules.length} module={newModule} sections={sections} l1s={l1s}
                                    courseId={courseId}/> : null}
            </div>
        );
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    onSortableItemClick(event, module) {
        browserHistory.push(Urls.PUBLISH_LINK + "?module=" + module.id);
    }

    toggleAddModulePopup() {
        this.setState({
            addModulePopup: !this.state.addModulePopup,
            newModule: true
        });
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.addModulePopup) {
                if (update) {
                    props.fetchPublished(props.courseId);
                }
                return {addModulePopup: false, newModule: false};
            }
            return prevState;
        });
    }

    onSortEnd(event, module, x, y, updatedItems) {
        this.props.updateOrder({
            courseId: this.props.courseId,
            moduleOrder: updatedItems.map(item => item.id)
        });
    }
}

PublishComponent.propTypes = {
    sections: PropTypes.array,
    fetchPublished: PropTypes.func,
    isLoading: PropTypes.bool,
    courseId: PropTypes.string,
    updateStatusFilter: PropTypes.func,
    contentType: PropTypes.string,
    updateOrder: PropTypes.func,
    clearData: PropTypes.func,
    userRole: PropTypes.string,
    newModule: PropTypes.object,
    l1s: PropTypes.array,
    fetchSections: PropTypes.func,
    modules: PropTypes.array
};
