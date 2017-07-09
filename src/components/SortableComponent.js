/**
 * Created by aditya on 3/7/17.
 */

"use strict";

import React, {PropTypes} from "react";
import {SortableContainer, SortableElement, arrayMove} from "react-sortable-hoc";

const SortableItem = SortableElement(({value, clickCallback, index}) =>
    <li className="sortableListItem" onClick={clickCallback.bind(this, index)} data-itemIndex={index}>
        <span>{value}</span>
    </li>
);

const SortableList = SortableContainer(({items, clickCallback}) => {
    return (
        <ul>
            {items.map((item, index) => (
                <SortableItem key={item.id} index={index} value={item.name} clickCallback={clickCallback}/>
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
        const {items, onClickCallback} = this.props;
        return <SortableList items={items} onSortEnd={this.onSortEnd} pressDelay={200} clickCallback={onClickCallback}/>;
    }
}

SortableComponent.propTypes = {
    items: PropTypes.array.isRequired,
    onSortEnd: PropTypes.func.isRequired,
    onClickCallback: PropTypes.func
};
