"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {Row, Col} from "react-flexbox-grid";
import CircularProgress from "material-ui/CircularProgress";
import {
    publishInitQuestions,
    publishInitTheories,
    fetchData as fetchDataRequest,
    publishHasErrored,
    publishItem as publishItemRequest
} from "./../actions/PublishActions";
import ListTableComponent from "./ListTableComponent";

class PublishingPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.publishedItems = {};
        this.selectedItem = {};
        this.headerColumns = [
            {
                displayName: "Question",
                key: "question"
            }, {
                displayName: "Type",
                key: "contentType"
            }, {
                displayName: "Section",
                key: "sectionId"
            }, {
                displayName: "L1",
                key: "l1Id"
            }, {
                displayName: "L2",
                key: "l2Id"
            }, {
                displayName: "Action",
                key: "action",
                actionLabel: "Publish"
            }
        ];
        this.state = {
            openDialog: props.publishDialog
        };
    }

    componentWillReceiveProps(nextProps) {
        const {courseId, fetchData, contentType} = this.props;
        if (courseId !== nextProps.courseId) {
            fetchData();
        }
        if (contentType !== nextProps.contentType) {
            fetchData();
        }
    }

    componentDidMount() {
        this.props.fetchData();
        this.props.publishedItems.forEach(item => {
            this.publishedItems[item.entityId] = item;
        });
    }

    render() {
        const {questions, theories, isLoading, contentType, fetchData} = this.props;
        const {openDialog} = this.state;
        let tableRows = contentType === "question" ? questions : theories;
        tableRows = tableRows.filter(row => !this.publishedItems[row.id]);

        if (contentType === "question") {
            this.headerColumns[0].displayName = "Question";
            this.headerColumns[0].key = "question";
        } else {
            this.headerColumns[0].displayName = "theory";
            this.headerColumns[0].key = "theory";
        }

        const actions = (
            <Row>
                <Col xs={6} sm={3}>
                    {isLoading ? <CircularProgress size={32}/> : null}
                </Col>
                <Col xs={6} sm={6}>
                    <FlatButton label="Cancel" onClick={this.dialogStatus.bind(this, false)}/>
                </Col>
                <Col xs={6} sm={3}>
                    <RaisedButton primary={true} label="Send" onClick={this.dialogStatus.bind(this, false)}/>
                </Col>
            </Row>
        );

        return (
            <Dialog contentClassName="publishPopupDialog" title="Accepted Items" open={openDialog} actions={actions} autoScrollBodyContent={true}>
                <Row>
                    <Col xs={12}>
                        <ListTableComponent headerColumns={this.headerColumns} tableRows={tableRows} usage="publish2"
                                            isLoading={isLoading} onFilterChange={fetchData.bind(this)}
                                            onCellClick={this.onCellClick.bind(this)}/>
                    </Col>
                    <br/><br/>
                    <Col xs={12}>
                        {!tableRows.length ? "No Items" : null}
                    </Col>
                </Row>
            </Dialog>
        );
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    onCellClick(rowNumber, columnsId) {
        const index = rowNumber - 1;
        const {questions, theories, contentType, publishItem, rankToSet, linkId} = this.props;
        this.selectedItem = contentType === "question" ? questions[index] : theories[index];

        function getDescription(item) {
            return item.id + " | " + item.question.substr(0, 20) + " | " + item.section.name + " | " + item.l1.name
                + " | " + item.l2.name + " | " + item.l3.name + " | " + item.l4.name;
        }

        if (columnsId === 6) {
            // publish
            const item = {
                entityId: this.selectedItem.id,
                entityType: contentType,
                rank: rankToSet,
                description: getDescription(this.selectedItem)
            };
            publishItem(item, linkId);
            this.dialogStatus(false);
        }
    }

    dialogStatus(status) {
        this.setState({
            openDialog: status
        });
        this.props.handleDialogClose(true);
    }
}

PublishingPopupComponent.propTypes = {
    courseId: PropTypes.string,
    fetchData: PropTypes.func,
    resetState: PropTypes.func,
    questions: PropTypes.array,
    theories: PropTypes.array,
    isLoading: PropTypes.bool,
    hasErrored: PropTypes.bool,
    errorMessage: PropTypes.string,
    contentType: PropTypes.string,
    publishItem: PropTypes.func,
    rankToSet: PropTypes.number,
    linkId: PropTypes.string,
    publishDialog: PropTypes.bool,
    handleDialogClose: PropTypes.func,
    publishedItems: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.publish,
        courseId: state.ContentReducer.selectedCourse.id,
        rankToSet: ownProps.rankToSet,
        publishDialog: ownProps.openDialog
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetState: () => {
            dispatch(publishInitQuestions([]));
            dispatch(publishInitTheories([]));
            dispatch(publishHasErrored(null, ""));
        },

        fetchData: () => {
            dispatch(fetchDataRequest());
        },

        publishItem: (item, linkId) => {
            dispatch(publishItemRequest(item, linkId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishingPopupComponent);
