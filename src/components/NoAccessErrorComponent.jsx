"use strict";

import React from "react";
import {Row, Col} from "react-flexbox-grid";
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory} from "react-router";

export default class NoAccessErrorComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row center="xs">
                <Col xs={12}>
                    <h2>You don't have access to view this page</h2>
                    <RaisedButton primary={true} label="Go Home" onClick={this.homeButtonClicked.bind(this)}/>
                </Col>
            </Row>
        );
    }

    homeButtonClicked() {
        browserHistory.push("/");
    }
}
