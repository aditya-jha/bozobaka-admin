/*
 * created by aditya on 10/7/17
 */

"use strict";

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class AddLinkPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                AddLinkPopup
            </div>
        );
    }
}

AddLinkPopup.propTypes = {};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkPopup);