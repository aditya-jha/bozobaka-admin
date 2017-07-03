"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import PublishPopup from "./PublishingPopupComponent";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import AddModulePopup from "./AddModulePopup";
import L1 from "./../models/L1";

export default class PublishComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addModulePopup: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchPublished, contentType} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchPublished();
        }
        if (contentType !== nextProps.contentType) {
            fetchPublished();
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.fetchPublished();
        this.props.fetchSections(this.props.courseId);
    }

    render() {
        const {sections, l1s, isLoading, publishDialog, userRole, newModule} = this.props;
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
                    <br/><br/>
                </Row>
                <Row>
                    <Col xs={12}>
                        <br/>
                        <RaisedButton primary={true} label="Add Module" onClick={this.toggleAddModulePopup.bind(this)} />
                    </Col>
                </Row>
                <br/><br/>
                {publishDialog ? <PublishPopup rankToSet={this.selectedItem.rank + 1}/> : null}
                {addModulePopup ? <AddModulePopup
                                        showDialog={addModulePopup}
                                        onDialogClose={this.handleDialogClose.bind(this)}
                                        module={newModule}
                                        sections={sections}
                                        l1s={l1s}
                                        /> : null}
            </div>
        );
    }

    componentWillUnmount() {
        this.props.clearData();
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
                    this.props.fetchPublished();
                }
                return {addModulePopup: false, newModule: false};
            }
            return prevState;
        });
    }

    unpublish() {
        this.props.unpublish(this.selectedItem);
        this.props.sortDialogStatus(null, false);
    }
}

PublishComponent.propTypes = {
    sections: PropTypes.array,
    fetchPublished: PropTypes.func,
    isLoading: PropTypes.bool,
    courseId: PropTypes.string,
    updateStatusFilter: PropTypes.func,
    contentType: PropTypes.string,
    sortDialog: PropTypes.bool,
    unpublish: PropTypes.func,
    sortDialogStatus: PropTypes.func,
    updateSort: PropTypes.func,
    clearData: PropTypes.func,
    publishDialog: PropTypes.bool,
    publishDialogStatus: PropTypes.func,
    userRole: PropTypes.string,
    newModule: PropTypes.object,
    l1s: PropTypes.array,
    fetchSections: PropTypes.func
};
