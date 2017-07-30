/* eslint consistent-return: "off" */
"use strict";

import React, {PropTypes} from "react";
import {Col, Row} from "react-flexbox-grid";
import CircularProgress from "material-ui/CircularProgress";

const LoaderComponent = ({isLoading}) => {
    if (isLoading) {
        return (
            <Row>
                <Col xs={12} style={{textAlign: "center"}}>
                    <CircularProgress/>
                </Col>
            </Row>
        );
    }
    return null;
};

LoaderComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired
};

export default LoaderComponent;
