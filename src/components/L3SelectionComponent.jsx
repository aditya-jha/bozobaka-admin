"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L3SelectionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {l3Id, l3s, onChange, l2Id} = this.props;
        let menuItems = l3s.filter((l3) => (l3.l2Id === l2Id));
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l3Id} width="100%"/>
        );
    }
}

L3SelectionComponent.propTypes = {
    l3Id: PropTypes.string,
    l3s: PropTypes.array,
    l2Id: PropTypes.string,
    onChange: PropTypes.func,
    actionOnUpdate: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        l3s: state.sections.l3s,
        l2Id: ownProps.l2Id,
        l3Id: ownProps.l3Id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.actionOnUpdate(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(L3SelectionComponent);
