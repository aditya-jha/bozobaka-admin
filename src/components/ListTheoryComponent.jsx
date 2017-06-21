"use strict";

import React, {PropTypes} from "react";
import {Row, Col} from "react-flexbox-grid";
import ListTableComponent from "./ListTableComponent";
import {browserHistory} from "react-router";
import Urls from "./../models/Urls";

export default class ListTheoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.headerColumns = [{
            displayName: "Theory",
            key: "heading"
        }, {
            displayName: "Status",
            key: "status"
        }, {
            displayName: "Section",
            key: "sectionId"
        }, {
            displayName: "L1",
            key: "l1Id"
        }, {
            displayName: "L2",
            key: "l2Id"
        }, {
            displayName: "Source",
            key: "source"
        }, {
            displayName: "Created",
            key: "created"
        }];
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchTheories} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchTheories();
        }
    }

    componentDidMount() {
        this.props.fetchTheories();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    render() {
        const {theories, isLoading, fetchTheories} = this.props;
        return (
            <div>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h1>List Of Theory</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={theories}
                                            isLoading={isLoading} onFilterChange={fetchTheories.bind(this)}
                                            usage="theory" onCellClick={this.onCellClick.bind(this)}/>
                    </Col>
                </Row>
                <br/><br/>
            </div>
        );
    }

    onCellClick(rowNumber) {
        const thoery = this.props.theories[rowNumber - 1];
        const url = Urls.ADD_THEORY + "?id=" + thoery.id;
        browserHistory.push(url);
    }
}

ListTheoryComponent.propTypes = {
    theories: PropTypes.array.isRequired,
    fetchTheories: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    courseId: PropTypes.string.isRequired,
    resetState: PropTypes.func.isRequired
};
