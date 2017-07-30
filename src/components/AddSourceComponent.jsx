"use strict";

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {connect} from "react-redux";
import {postSource, sourceDialogState, sourceRequestState, sourceUpdateName} from "./../actions/SourceActions";
import CircularProgress from "material-ui/CircularProgress";

class AddSourceComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.requestSuccess) {
            nextProps.setDialogState(false);
            nextProps.setRequestState(false);
        }
    }

    render() {
        const {createSource, sourceTextChange, setDialogState, openDialog, isLoading} = this.props;
        const actions = [
            <FlatButton label="Cancel" onTouchTap={setDialogState.bind(this)} disabled={isLoading}/>,
            <FlatButton label="Save" primary={true} onTouchTap={createSource.bind(this)} disabled={isLoading}/>
        ];

        return (
            <div>
                <RaisedButton label="Add Source" primary={true} onClick={setDialogState.bind(this, true)}/>
                <Dialog title="Add Source" actions={actions} modal={false} open={openDialog}
                        onRequestClose={setDialogState.bind(this)}>
                    <TextField title="Source" hintText="Add Source Name" onChange={sourceTextChange.bind(this)}
                               fullWidth={true}/>
                    {isLoading ? <CircularProgress/> : null}
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.sources
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createSource: () => {
            dispatch(postSource());
        },

        sourceTextChange: (event, value) => {
            dispatch(sourceUpdateName(value));
        },

        setDialogState: (state = false) => {
            state = typeof state !== "boolean" ? false : state;
            dispatch(sourceDialogState(state));
        },

        setRequestState: (state) => {
            dispatch(sourceRequestState(state));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSourceComponent);
