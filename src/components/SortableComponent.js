/**
 * Created by aditya on 3/7/17.
 */

"use strict";

import React, {PropTypes} from "react";
import {SortableContainer, SortableElement, arrayMove} from "react-sortable-hoc";

const SortableItem = SortableElement(({value}) =>
    <li className="sortableListItem">{value}</li>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((item, index) => (
                <SortableItem key={item.id} index={index} value={item.name} />
            ))}
        </ul>
    );
});

export default class SortableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.onSortEnd(arrayMove(this.props.items, oldIndex, newIndex));
    };

    render() {
        const {items} = this.props;
        return <SortableList items={items} onSortEnd={this.onSortEnd} />;
    }
}

SortableComponent.propTypes = {
    items: PropTypes.array.isRequired,
    onSortEnd: PropTypes.func.isRequired
};
