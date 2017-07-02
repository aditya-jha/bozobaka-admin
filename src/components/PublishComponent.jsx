"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import Urls from "./../models/Urls";
import {browserHistory} from "react-router";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import PublishPopup from "./PublishingPopupComponent";
import NoAccessErrorComponent from "./NoAccessErrorComponent";

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
    }

    render() {
        const {published, fetchPublished, sortDialog, sortDialogStatus, isLoading, publishDialog, userRole} = this.props;
        const {addModulePopup} = this.state;

        if (userRole === "contentWriter" || userRole === "reviewer") {
            return <NoAccessErrorComponent/>;
        }

        const styles = {
            pageTitle: {
                fontWeight: 400
            }
        };

        const actions = (
            <Row>
                <Col xs={6} sm={3}>
                    <FlatButton secondary={true} label="Unpublish" onClick={this.unpublish.bind(this)}/>
                </Col>
                <Col xs={6} sm={6}>
                    <FlatButton label="Cancel" onClick={sortDialogStatus.bind(this, false)}/>
                </Col>
                <Col xs={6} sm={3}>
                    <RaisedButton primary={true} label="Update" onClick={this.updateSort.bind(this)}/>
                </Col>
            </Row>
        );

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
                        <RaisedButton label="Add Module" onClick={this.toggleAddModulePopup.bind(this)} />
                    </Col>
                </Row>
                <br/><br/>
                {publishDialog ? <PublishPopup rankToSet={this.selectedItem.rank + 1}/> : null}
                {addModulePopup ? null : null}
            </div>
        );
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    toggleAddModulePopup() {
        this.setState({
            addModulePopup: !this.state.addModulePopup
        });
    }

    onCellClick(rowNumber, columnsId) {
        const index = rowNumber - 1;
        const {published, sortDialogStatus, publishDialogStatus} = this.props;
        this.selectedItem = published[index];
        
        if (columnsId === 7) {
            // add below
            publishDialogStatus(true);
        } else if (columnsId === 6) {
            // change sort
            sortDialogStatus(true);
        } else {
            const url = this.selectedItem.question ? Urls.ADD_QUESTION : Urls.ADD_THEORY;
            browserHistory.push(url + "?id=" + this.selectedItem.id);
        }
    }

    updateSort() {
        try {
            const rank = parseInt(this.refs.newRankValue.input.value, 10);
            this.props.updateSort(this.selectedItem, rank);
            this.props.sortDialogStatus(null, false);
        } catch (error) {
            console.log(error);
        }
    }

    unpublish() {
        this.props.unpublish(this.selectedItem);
        this.props.sortDialogStatus(null, false);
    }
}

PublishComponent.propTypes = {
    published: PropTypes.array,
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
    userRole: PropTypes.string
};
