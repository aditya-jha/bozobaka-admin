/*
 * created by aditya on 10/7/17
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
import {
    updateLinks
} from "./../services/PublishService";


export default class AddLinkPopup extends React.Component {
    constructor(props) {
        super(props);
        this.scope = {
            link: {
                moduleId: props.link.moduleId || props.module.id,
                id: props.link.id
            }
        };

        this.state = {
            name: props.link.name,
            requestInProgress: false,
            openDialog: false,
            dialogTitle: props.link.id ? "Edit Link" : "Add New Link",
            openSnackbar: false,
            snackbarMessage: ""
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.setState({openDialog: this.props.showDialog});
    }

    render() {
        const {openDialog, dialogTitle} = this.state;
        const {link, module} = this.props;

        const actions = (
            <Row>
                <Col xs={6} sm={3}>
                    <FlatButton secondary={true} label="Delete" onClick={this.deleteButton.bind(this)}
                                disabled={!this.props.link.id}/>
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
                <Dialog actions={actions} open={openDialog} modal={false} title={dialogTitle}
                        autoScrollBodyContent={true}>
                    <Row>
                        <Col xs={12}>
                            <TextField
                                defaultValue={link.name}
                                floatingLabelText="Link Name"
                                onChange={this.handleNameChange.bind(this)} required/>
                        </Col>
                    </Row>
                    <br /><br />
                    <Row>
                        <Col xs={12}>
                            <p>Module</p>
                            <h3>{module.name}</h3>
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

    handleNameChange(event, newValue) {
        this.scope.link.name = newValue;
    }

    deleteButton() {
        const {link} = this.scope;

        this.setState({
            requestInProgress: true
        });

        return updateLinks(link, {
            method: "DELETE"
        }).then(res => {
            this.scope.link = res;
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
        const {link} = this.scope;

        if (!link.name) {
            return null;
        }

        link.displayName = link.name;

        return updateLinks(link, {
            method: link.id ? "PUT" : "POST"
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

AddLinkPopup.propTypes = {
    module: PropTypes.object.isRequired,
    showDialog: PropTypes.bool,
    onDialogClose: PropTypes.func,
    courseId: PropTypes.string,
    link: PropTypes.object
};

