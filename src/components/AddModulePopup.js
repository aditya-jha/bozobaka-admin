/**
 * Created by aditya on 2/7/17.
 */

"use strict";

import React, {PropTypes} from "react";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import CircularProgress from "material-ui/CircularProgress";
import {Row, Col} from "react-flexbox-grid";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import DropdownDisplay from "./DropdownDisplayComponent";
import {
    updateModules
} from "./../services/PublishService";

export default class AddModulePopup extends React.Component {
    constructor(props) {
        super(props);
        this.scope = {
            module: props.module
        };

        this.state = {
            requestInProgress: false,
            openDialog: false,
            dialogTitle: props.module.id ? "Edit Module" : "Add New Module",
            openSnackbar: false,
            snackbarMessage: "",
            sectionValue: props.module.sectionId,
            l1Value: props.module.l1Id
        };
    }

    componentWillMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {

        const {sections, l1s} = this.props;
        const {sectionValue, l1Value} = this.state;

        const actions = (
            <Row>
                <Col xs={6} sm={3}>
                    <FlatButton secondary={true} label="Delete" onClick={this.deleteButton.bind(this)}
                                disabled={!this.props.module.id}/>
                </Col>
                <Col xs={6} sm={6}>
                    <FlatButton label="Cancel" onClick={this.cancelButton.bind(this, false)}/>
                </Col>
                <Col xs={6} sm={3}>
                    <RaisedButton primary={true} label="Save" onClick={this.saveButton.bind(this)}/>
                </Col>
            </Row>
        );

        return (
            <div>
                <Dialog
                    actions={actions} open={this.state.openDialog} modal={false}
                    title={this.state.dialogTitle} autoScrollBodyContent={true}>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                defaultValue={this.props.module.name} title="Connot be empty" pattern=".{1,}" type="text"
                                hintText="Enter Module Name" floatingLabelText="Module Name"
                                onChange={this.handleNameChange.bind(this)} required/>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col xs={6}>
                            <p>Section</p>
                            <DropdownDisplay onChange={this.handleSectionChange.bind(this)} menuItems={sections} value={sectionValue}/>
                        </Col>
                        <Col xs={6}>
                            <p>L1</p>
                            <DropdownDisplay onChange={this.handleL1Change.bind(this)} value={l1Value}
                                             menuItems={l1s.filter(l1 => l1.sectionId === this.state.sectionValue)} />
                        </Col>
                    </Row>
                    {this.state.requestInProgress ?
                        <Row center="xs">
                            <Col xs={12}><CircularProgress/></Col>
                        </Row> : <br/>}
                </Dialog>
                <Snackbar open={this.state.openSnackbar} message={this.state.snackbarMessage} autoHideDuration={2000}/>
            </div>
        );
    }

    handleSectionChange(event, index, value) {
        this.setState({
            sectionValue: value,
            l1Value: ""
        });
    }

    handleL1Change(event, index, value) {
        this.setState({l1Value: value});
    }

    handleNameChange(event, newValue) {
        this.scope.module.name = newValue;
    }

    deleteButton() {
        const {module} = this.scope;
        this.setState({
            requestInProgress: true
        });

        return updateModules(module, {
            method: "DELETE"
        }).then(res => {
            console.log(res);
            this.setState({
                requestInProgress: false
            });
            this.cancelButton(true);
        }).catch(err => {
            this.setState({
                requestInProgress: false,
                openSnackbar: true,
                snackbarMessage: err.message
            });
        });
    }

    cancelButton(update = false) {
        this.setState({openDialog: false});
        this.props.onDialogClose(update);
    }

    saveButton() {
        const {module} = this.scope;

        if (!module.name) {
            return null;
        }

        return updateModules(module, {
            method: module.id ? "PATCH" : "POST"
        }).then(res => {
            console.log(res);
            this.setState({
                requestInProgress: false
            });
            this.cancelButton(true);
        }).catch(err => {
            this.setState({
                requestInProgress: false,
                openSnackbar: true,
                snackbarMessage: err.message
            });
        });
    }
}

AddModulePopup.propTypes = {
    module: PropTypes.object.isRequired,
    sections: PropTypes.array.isRequired,
    onDialogClose: PropTypes.func.isRequired,
    l1s: PropTypes.array.isRequired
};

