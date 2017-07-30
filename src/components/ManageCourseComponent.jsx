"use strict";

import React from "react";
import NoAccessErrorComponent from "./NoAccessErrorComponent";
import {Row, Col} from "react-flexbox-grid";
import RaisedButton from "material-ui/RaisedButton";
import ContentService from "./../services/ContentService";
import Collapse, {Panel} from "rc-collapse";
import "style-loader!css-loader!rc-collapse/assets/index.css";
import PanelHeader from "./PanelHeader";
import EditSectionComponent from "./EditSectionComponent";
import EditL1Component from "./EditL1Component";
import EditL2Component from "./EditL2Component";
import EditL3Component from "./EditL3Component";
import EditL4Component from "./EditL4Component";

export default class ManageCourseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.scope = {
            courseId: props.selectedCourse.id,
            sectionToOpen: {},
            l1ToOpen: {},
            l2ToOpen: {},
            l3ToOpen: {},
            l4ToOpen: {}
        };
        this.state = {
            hasAccess: props.loggedInUser.role === "admin",
            sections: [],
            showLoader: false,
            openSectionDialog: false,
            openL1Dialog: false,
            openL2Dialog: false,
            openL3Dialog: false,
            openL4Dialog: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCourse.id !== this.scope.courseId) {
            this.scope.courseId = nextProps.selectedCourse.id;
            this.fetchDataFromServer();
        }
        this.setState({
            hasAccess: nextProps.loggedInUser.role === "admin"
        });
    }

    componentWillMount() {
        this.scope.courseId = this.props.selectedCourse.id;
    }

    componentDidMount() {
        this.fetchDataFromServer();
    }

    render() {
        if (!this.state.hasAccess) {
            return <NoAccessErrorComponent/>;
        }

        return (
            <div>
                <br/>
                <h2>Manage Course</h2>
                <br/>
                <Row>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add Section" onClick={this.editSection.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L1" onClick={this.editL1.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L2" onClick={this.editL2.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L3" onClick={this.editL3.bind(this)} primary={true}/>
                    </Col>
                    <Col xs={6} sm={2}>
                        <RaisedButton label="Add L4" onClick={this.editL4.bind(this)} primary={true}/>
                    </Col>
                </Row>
                <br/>
                {this.state.sections.length === 0 ? <h2>No Sections</h2> :
                    <Row>
                        <Col xs={12}>
                            <Collapse accordion={true}>
                                {this.state.sections.map((section, sectionIndex) => (
                                    <Panel header={<PanelHeader title={section.name}
                                                                titleClick={this.editSection.bind(this)}
                                                                index={sectionIndex}/>} key={sectionIndex}>
                                        {section.l1s.length === 0 ? <h3>No L1s</h3> :
                                            <Collapse accordion={true}>
                                                {section.l1s.map((l1, l1Index) => (
                                                    <Panel header={<PanelHeader title={l1.name}
                                                                                titleClick={this.editL1.bind(this, sectionIndex)}
                                                                                index={l1Index}/>} key={l1Index}>
                                                        {l1.l2s.length === 0 ? <h3>No L2s</h3> :
                                                            <Collapse accordion={true}>
                                                                {l1.l2s.map((l2, l2Index) => (
                                                                    <Panel header={<PanelHeader title={l2.name}
                                                                                                titleClick={this.editL2.bind(this, sectionIndex, l1Index)}
                                                                                                index={l2Index}/>}
                                                                           key={l2Index}>
                                                                        {l2.l3s.length === 0 ? <h3>No L3s</h3> :
                                                                            <Collapse accordion={true}>
                                                                                {l2.l3s.map((l3, l3Index) => (
                                                                                    <Panel header={<PanelHeader
                                                                                        title={l3.name}
                                                                                        titleClick={this.editL3.bind(this, sectionIndex, l1Index, l2Index)}
                                                                                        index={l3Index}/>}
                                                                                           key={l3Index}>
                                                                                        {l3.l4s.length === 0 ?
                                                                                            <h3>No L4s</h3> :
                                                                                            <ul>
                                                                                                {l3.l4s.map((l4, l4Index) => (
                                                                                                    <li key={l4Index}>{l4.name}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        }
                                                                                    </Panel>
                                                                                ))}
                                                                            </Collapse>
                                                                        }
                                                                    </Panel>
                                                                ))}
                                                            </Collapse>
                                                        }
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        }
                                    </Panel>
                                ))}
                            </Collapse>
                        </Col>
                    </Row>
                }
                {this.state.openSectionDialog ? <EditSectionComponent showDialog={this.state.openSectionDialog}
                                                                      onDialogClose={this.handleDialogClose.bind(this)}
                                                                      courseId={this.scope.courseId}
                                                                      sectionToOpen={this.scope.sectionToOpen}/> : null}

                {this.state.openL1Dialog ? <EditL1Component showDialog={this.state.openL1Dialog}
                                                            onDialogClose={this.handleDialogClose.bind(this)}
                                                            sections={this.state.sections}
                                                            courseId={this.scope.courseId}
                                                            l1ToOpen={this.scope.l1ToOpen}/> : null}

                {this.state.openL2Dialog ? <EditL2Component showDialog={this.state.openL2Dialog}
                                                            onDialogClose={this.handleDialogClose.bind(this)}
                                                            sections={this.state.sections}
                                                            courseId={this.scope.courseId}
                                                            l1ToOpen={this.scope.l1ToOpen}
                                                            l2ToOpen={this.scope.l2ToOpen}/> : null}
                {this.state.openL3Dialog ? <EditL3Component showDialog={this.state.openL3Dialog}
                                                            onDialogClose={this.handleDialogClose.bind(this)}
                                                            sections={this.state.sections}
                                                            courseId={this.scope.courseId}
                                                            l1ToOpen={this.scope.l1ToOpen}
                                                            l2ToOpen={this.scope.l2ToOpen}
                                                            l3ToOpen={this.scope.l3ToOpen}/> : null}
                {this.state.openL4Dialog ? <EditL4Component showDialog={this.state.openL4Dialog}
                                                            onDialogClose={this.handleDialogClose.bind(this)}
                                                            sections={this.state.sections}
                                                            courseId={this.scope.courseId}
                                                            l1ToOpen={this.scope.l1ToOpen}
                                                            l2ToOpen={this.scope.l2ToOpen}
                                                            l3ToOpen={this.scope.l3ToOpen}
                                                            l4ToOpen={this.scope.l4ToOpen}/> : null}
            </div>
        );
    }

    fetchDataFromServer() {
        this.setState({showLoader: true});
        ContentService.fetchSections({courseId: this.scope.courseId}).then((sections) => {
            this.setState({
                sections: sections,
                showLoader: false
            });
        }).catch((err) => {
            console.log(err);
            this.setState({showLoader: false});
        });
    }

    getSectionToOpen(rowIndex) {
        return (typeof rowIndex === "number") ? this.state.sections[rowIndex] : {};
    }

    getL1ToOpen(sectionIndex, l1Index) {
        return (typeof sectionIndex === "number" && typeof l1Index === "number") ? this.state.sections[sectionIndex].l1s[l1Index] : {};
    }

    getL2ToOpen(sectionIndex, l1Index, l2Index) {
        return (typeof sectionIndex === "number" && typeof l1Index === "number" && typeof l2Index === "number") ?
            this.state.sections[sectionIndex].l1s[l1Index].l2s[l2Index] : {};
    }

    getL3ToOpen(sectionIndex, l1Index, l2Index, l3Index) {
        return (typeof sectionIndex === "number" && typeof l1Index === "number" && typeof l2Index === "number" && typeof l3Index === "number") ?
            this.state.sections[sectionIndex].l1s[l1Index].l2s[l2Index].l3s[l3Index] : {};
    }

    getL4ToOpen(sectionIndex, l1Index, l2Index, l3Index, l4Index) {
        return (typeof sectionIndex === "number" && typeof l1Index === "number" && typeof l2Index === "number" && typeof l3Index === "number" && typeof l4Index === "number") ?
            this.state.sections[sectionIndex].l1s[l1Index].l2s[l2Index].l3s[l3Index].l4s[l4Index] : {};
    }

    editSection(rowIndex) {
        this.scope.sectionToOpen = this.getSectionToOpen(rowIndex);
        this.setState({openSectionDialog: true});
    }

    editL1(sectionIndex, l1Index) {
        this.scope.sectionToOpen = this.getSectionToOpen(sectionIndex);
        this.scope.l1ToOpen = this.getL1ToOpen(sectionIndex, l1Index);
        this.setState({openL1Dialog: true});
    }

    editL2(sectionIndex, l1Index, l2Index) {
        this.scope.sectionToOpen = this.getSectionToOpen(sectionIndex);
        this.scope.l1ToOpen = this.getL1ToOpen(sectionIndex, l1Index);
        this.scope.l2ToOpen = this.getL2ToOpen(sectionIndex, l1Index, l2Index);
        this.setState({openL2Dialog: true});
    }

    editL3(sectionIndex, l1Index, l2Index, l3Index) {
        this.scope.sectionToOpen = this.getSectionToOpen(sectionIndex);
        this.scope.l1ToOpen = this.getL1ToOpen(sectionIndex, l1Index);
        this.scope.l2ToOpen = this.getL2ToOpen(sectionIndex, l1Index, l2Index);
        this.scope.l3ToOpen = this.getL3ToOpen(sectionIndex, l1Index, l2Index, l3Index);
        this.setState({openL3Dialog: true});
    }

    editL4(sectionIndex, l1Index, l2Index, l3Index, l4Index) {
        this.scope.sectionToOpen = this.getSectionToOpen(sectionIndex);
        this.scope.l1ToOpen = this.getL1ToOpen(sectionIndex, l1Index);
        this.scope.l2ToOpen = this.getL2ToOpen(sectionIndex, l1Index, l2Index);
        this.scope.l3ToOpen = this.getL3ToOpen(sectionIndex, l1Index, l2Index, l3Index);
        this.scope.l4ToOpen = this.getL4ToOpen(sectionIndex, l1Index, l2Index, l3Index, l4Index);
        this.setState({openL4Dialog: true});
    }

    handleDialogClose(update = false) {
        this.setState((prevState, props) => {
            if (prevState.openSectionDialog) {
                update ? this.fetchDataFromServer() : null;
                return {openSectionDialog: false};
            } else if (prevState.openL1Dialog) {
                update ? this.fetchDataFromServer() : null;
                return {openL1Dialog: false};
            } else if (prevState.openL2Dialog) {
                update ? this.fetchDataFromServer() : null;
                return {openL2Dialog: false};
            } else if (prevState.openL3Dialog) {
                update ? this.fetchDataFromServer() : null;
                return {openL3Dialog: false};
            } else if (prevState.openL4Dialog) {
                update ? this.fetchDataFromServer() : null;
                return {openL4Dialog: false};
            }
        });
    }
}
