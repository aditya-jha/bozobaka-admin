"use strict";

import React, {PropTypes} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import FilterComponent from "./FilterComponent";
import LivePreview from "./LivePreviewComponent";
import {parseKatex} from "./../services/KatexParser";

const ListTableComponent = ({headerColumns, tableRows, onFilterChange, usage, onCellClick}) => {
    const style = {
        tableRowColumn: {
            whiteSpace: "normal",
            width: "100%",
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: "inherit"
        },
        sort: {
            textDecoration: "underline",
            paddingLeft: 20,
            cursor: "pointer",
            color: "#0F55FF"
        }
    };

    return (
        <Table fixedHeader={false} fixedFooter={false} onCellClick={onCellClick.bind(this)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                <TableRow>
                    {headerColumns.map((col, index) => (
                        <TableHeaderColumn key={index}>{col.displayName}</TableHeaderColumn>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {onFilterChange ? <FilterComponent onChangeAction={onFilterChange} usage={usage}
                                                   headerColumns={headerColumns}/> : null}
                {
                    tableRows.map((row, index) => (
                        <TableRow key={index} striped={true}>
                            {headerColumns.map((col, colIndex) => {
                                let value = "";
                                switch (col.key) {
                                    case "l1Id":
                                        value = row.l1.name;
                                        break;
                                    case "l2Id":
                                        value = row.l2.name;
                                        break;
                                    case "sectionId":
                                        value = row.section.name;
                                        break;
                                    case "source":
                                        value = row.source.name;
                                        break;
                                    case "question":
                                        value = <LivePreview content={parseKatex(row.question)}/>;
                                        break;
                                    case "theory":
                                        value = <LivePreview content={parseKatex(row.theory)}/>;
                                        break;
                                    case "qt":
                                        value = row.question ? <LivePreview content={parseKatex(row.question)}/> :
                                            <LivePreview content={parseKatex(row.theory)}/>;
                                        break;
                                    case "action":
                                        value = <span style={style.sort}>{col.actionLabel}</span>;
                                        break;
                                    case "contentType":
                                        value = row.question ? "Question" : "Theory";
                                        break;
                                    case "rank":
                                        value = <span style={style.sort}>{row[col.key]}</span>;
                                        break;
                                    default:
                                        value = row[col.key];
                                }
                                return (<TableRowColumn key={colIndex}
                                                        style={style.tableRowColumn}>{value}</TableRowColumn>);
                            })}
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

ListTableComponent.defaultProps = {
    tableRows: []
};

ListTableComponent.propTypes = {
    headerColumns: PropTypes.array.isRequired,
    tableRows: PropTypes.array.isRequired,
    onFilterChange: PropTypes.func,
    usage: PropTypes.string,
    onCellClick: PropTypes.func
};

export default ListTableComponent;

