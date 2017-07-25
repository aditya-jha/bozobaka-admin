
 /*
 * created by aditya on 10/7/17
*/

"use strict";

import React from "react";
import PropTypes from "prop-types";

const SortableListItem = ({item}) => {
    return (
        <li className="sortableListItem">{item.name}</li>
    );
};

SortableListItem.propTypes = {
    item: PropTypes.object
};

export default SortableListItem;
