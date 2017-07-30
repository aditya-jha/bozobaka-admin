"use strict";

import React from "react";
import ContentService from "./../services/ContentService";
import {Col, Row} from "react-flexbox-grid";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import RaisedButton from "material-ui/RaisedButton";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import EditCourseComponent from "./EditCourseComponent";
import EditReviewerContentWriterComponent from "./EditReviewerContentWriterComponent";
import EditAdminComponent from "./EditAdminComponent";

export default class ManageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasAccess: props.loggedInUser.role === "superAdmin",
            admins: [],
            reviewers: [],
            contentWriters: [],
            openCourseDialog: false,
            openReviewerContentWriterDialog: false,
            openAdminDialog: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({hasAccess: nextProps.loggedInUser.role === "superAdmin"});
    }

    componentDidMount() {
        this.fetchDataFromServer();
    }

    render() {
        if (!this.state.hasAccess) {
            return <NoAccessErrorComponent/>;
        }

        let sectionTitleStyle = {
            paddingTop: 10
        };

        const {courses, sections} = this.props;
        const {
            reviewers, admins, contentWriters, openCourseDialog, openReviewerContentWriterDialog,
            openAdminDialog, userRole
        } = this.state;

        return (
            <div>
                <br/>
                <h2>Manage</h2>
                <br/>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Courses</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editCourse.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editCourse.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Admin</TableHeaderColumn>
                                    <TableHeaderColumn># Question Writer</TableHeaderColumn>
                                    <TableHeaderColumn># Reviewers</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {courses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableRowColumn>{course.id}</TableRowColumn>
                                        <TableRowColumn>{course.displayName}</TableRowColumn>
                                        <TableRowColumn>{this.getDisplayText(course.admins)}</TableRowColumn>
                                        <TableRowColumn>{course.contentWriterCount ? course.contentWriterCount : 0}</TableRowColumn>
                                        <TableRowColumn>{course.reviewerCount ? course.reviewerCount : 0}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Admins</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editAdmin.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editAdmin.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Courses</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {admins.map((admin) => (
                                    <TableRow key={admin.id}>
                                        <TableRowColumn>{admin.id}</TableRowColumn>
                                        <TableRowColumn>{admin.displayName}</TableRowColumn>
                                        <TableRowColumn
                                            style={{whiteSpace: "normal"}}>{admin.courseDisplayText}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Reviewers</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editReviewer.bind(this, null)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editReviewer.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {reviewers.map((reviewer, index) => (
                                    <TableRow key={reviewer.id}>
                                        <TableRowColumn>{reviewer.id}</TableRowColumn>
                                        <TableRowColumn>{reviewer.displayName}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col xs={6} sm={4}>
                        <h2 style={sectionTitleStyle}>Question Writers</h2>
                    </Col>
                    <Col xs={6} sm={8}>
                        <RaisedButton label="Add" onClick={this.editQuestionWriter.bind(this, null)} primary={true}/>
                    </Col>
                    <Col xs={12}>
                        <Table fixedFooter={false} onCellClick={this.editQuestionWriter.bind(this)}>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>

                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {contentWriters.map((contentWriter, index) => (
                                    <TableRow key={contentWriter.id}>
                                        <TableRowColumn>{contentWriter.id}</TableRowColumn>
                                        <TableRowColumn>{contentWriter.displayName}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <br/><br/>
                {openCourseDialog ?
                    <EditCourseComponent showDialog={openCourseDialog} courseToOpen={this.courseToOpen} admins={admins}
                                         onDialogClose={this.handleDialogClose.bind(this)}
                                         updateCourse={this.updateCourseData.bind(this)}/>
                    : null}

                {openReviewerContentWriterDialog ?
                    <EditReviewerContentWriterComponent showDialog={openReviewerContentWriterDialog}
                                                        userRole={userRole} courses={courses} allSection={sections}
                                                        onDialogClose={this.handleDialogClose.bind(this)}
                                                        userToOpen={this.userToOpen}/> :
                    null}
                {openAdminDialog ?
                    <EditAdminComponent showDialog={openAdminDialog} adminToOpen={this.adminToOpen} courses={courses}
                                        onDialogClose={this.handleDialogClose.bind(this)}/>
                    : null
                }
            </div>
        );
    }

    fetchDataFromServer(admin = true, reviewer = true, contentWriter = true) {
        if (admin) {
            ContentService.fetchAdmins().then((admins) => {
                for (let i = 0; i < admins.length; i = i + 1) {
                    admins[i].courseDisplayText = this.getDisplayText(admins[i].courses);
                }
                this.setState({admins: admins});
            }).catch((err) => {
                console.log(err);
            });
        }
        if (reviewer) {
            ContentService.fetchReviewers()
                .then((reviewers) => {
                    this.setState({reviewers: reviewers});
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (contentWriter) {
            ContentService.fetchContentWriters()
                .then((contentWriters) => {
                    this.setState({contentWriters: contentWriters});
                }).catch((err) => {
                console.log(err);
            });
        }
    }

    updateCourseData(course, remove) {
        this.fetchDataFromServer(true, false, false);
        this.props.updateCourseData(course, remove);
    }

    editCourse(courseIndex) {
        this.courseToOpen = typeof courseIndex === "number" ? this.props.courses[courseIndex] : {};
        this.setState({openCourseDialog: true});
    }

    editAdmin(adminIndex) {
        this.adminToOpen = typeof adminIndex === "number" ? this.state.admins[adminIndex] : {};
        this.setState({openAdminDialog: true});
    }

    editReviewer(index) {
        this.userToOpen = (typeof index === "number") ? this.state.reviewers[index] : {};
        this.setState({openReviewerContentWriterDialog: true, userRole: "reviewer"});
    }

    editQuestionWriter(index) {
        this.userToOpen = (typeof index === "number") ? this.state.contentWriters[index] : {};
        this.setState({openReviewerContentWriterDialog: true, userRole: "contentWriter"});
    }

    getDisplayText(items = []) {
        let displayText = "";
        for (let i = 0; i < items.length; i++) {
            displayText += items[i].displayName + ", ";
        }
        if (displayText.endsWith(", ")) {
            displayText = displayText.substr(0, displayText.length - 2);
        }
        return displayText;
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.openCourseDialog) {
                update ? this.fetchDataFromServer() : null;
                return {openCourseDialog: false};
            } else if (prevState.openAdminDialog) {
                update ? this.fetchDataFromServer(true, false, false) : null;
                return {openAdminDialog: false};
            } else if (prevState.openReviewerContentWriterDialog) {
                if (update && this.state.userRole == "reviewer") {
                    this.fetchDataFromServer(false, true, false);
                } else if (update) {
                    this.fetchDataFromServer(false, false, true);
                }
                return {openReviewerContentWriterDialog: false};
            }
        });
    }
}
