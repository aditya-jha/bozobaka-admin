/*
 * created by aditya on 30/7/17
*/

"use strict";

import React from "react";
import PropTypes from "prop-types";

const SortablePublishContentItemComponent = ({item}) => {
    return (
        <li className="sortableListItem">
            {item.id} | {item.entityType}
            <span className="publishContentDeleteButton">delete</span>
        </li>
    );
};

SortablePublishContentItemComponent.propTypes = {
    item: PropTypes.object
};

export default SortablePublishContentItemComponent;
