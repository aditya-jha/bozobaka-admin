"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import DropdownDisplay from "./DropdownDisplayComponent";

class L2SelectionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {l2Id, l2s, onChange, l1Id, width} = this.props;
        let menuItems = l2s.filter((l2) => (l2.l1Id === l1Id));
        return (
            <DropdownDisplay onChange={onChange.bind(this)} menuItems={menuItems} value={l2Id} width={width}/>
        );
    }
}

L2SelectionComponent.propTypes = {
    l2Id: PropTypes.string.isRequired,
    l1Id: PropTypes.string.isRequired,
    actionOnUpdate: PropTypes.func.isRequired,
    l2s: PropTypes.array,
    onChange: PropTypes.func,
    width: PropTypes.string || PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
    return {
        l2s: state.sections.l2s,
        l1Id: ownProps.l1Id,
        l2Id: ownProps.l2Id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (event, index, value) => {
            dispatch(ownProps.actionOnUpdate(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(L2SelectionComponent);
