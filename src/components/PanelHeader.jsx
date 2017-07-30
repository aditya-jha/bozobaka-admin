"use strict";

import React from "react";
import PropTypes from "prop-types";

const PanelHeader = (props) => {
    return (<span onClick={props.titleClick.bind(this, props.index)}><u>{props.title}</u></span>);
};

PanelHeader.propTypes = {
    titleClick: PropTypes.func,
    index: PropTypes.number,
    title: PropTypes.string
};

export default PanelHeader;
