"use strict";

import React, {PropTypes} from "react";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

const DropDownDisplayComponent = ({menuItems, value, onChange, disabled, width, hideDefault}) => {
    const style = {
        width: width ? width : 300
    };
    return (
        <DropDownMenu value={value || ""} onChange={onChange.bind(this)} disabled={disabled} style={style} autoWidth={true}>
            {!hideDefault ? <MenuItem value="" primaryText="Select"/> : null}
            {menuItems.map((item, index) => {
                if (typeof item === "object") {
                    return <MenuItem value={item.id} primaryText={item.displayName ? item.displayName : item.name} key={index}/>;
                }
                return <MenuItem value={item} primaryText={item} key={index}/>;
            })}
        </DropDownMenu>
    );
};

DropDownDisplayComponent.defaultProps = {
    disabled: false,
    hideDefault: false
};

DropDownDisplayComponent.propTypes = {
    menuItems: PropTypes.array.isRequired,
    value: PropTypes.string || PropTypes.number,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    width: PropTypes.string || PropTypes.number,
    hideDefault: PropTypes.bool
};

export default DropDownDisplayComponent;
