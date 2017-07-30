/*
 created by: Aditya Jha
 date: 13-02-2017
 */
import React, {PropTypes} from "react";
import CircularProgress from "material-ui/CircularProgress";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Checkbox from "material-ui/Checkbox";
import LoginService from "./../services/LoginService";
import Paper from "material-ui/Paper";
import {connect} from "react-redux";
import GlobalActions from "../actions/GlobalActions";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false
        };
    }

    render() {
        const paperStyle = {
            paddingTop: 10,
            paddingBottom: 10
        };

        const submitButtonStyle = {
            paddingLeft: 20,
            paddingRight: 20
        };

        return (
            <div className="login-container">
                <Paper zDepth={1} rounded={false} style={paperStyle}>
                    <h1>BrownBoard</h1>
                    <br/>
                    <h2>Login</h2>
                    <form onSubmit={this.onFormSubmit.bind(this)}>
                        <TextField ref="email" type="email" hintText="Enter your email" floatingLabelText="Email"
                                   required/>
                        <br/>
                        <TextField ref="password" title="Minimum 6 characters required" pattern=".{6,}" type="password"
                                   hintText="Enter your password" floatingLabelText="Password" required/>
                        <br/>
                        <br/>
                        <Checkbox style={{paddingLeft: 20, textAlign: "left"}} ref="rememberMe" label="Remember Me"/>
                        <br/>
                        {this.state.showLoader ? <CircularProgress/> :
                            <div style={submitButtonStyle}>
                                <RaisedButton label="Log in" primary={true} type="submit" fullWidth={true}/>
                            </div>
                        }
                    </form>
                </Paper>
            </div>
        );
    }

    onFormSubmit(event) {
        event.preventDefault();
        if (!this.state.showLoader) {
            this.setState({showLoader: true});
            LoginService.login({
                email: this.refs.email.input.value,
                password: this.refs.password.input.value,
                rememberMe: this.refs.rememberMe.state.switched
            }).then(res => {
                this.setState({showLoader: false});
                this.props.toggleLoginStatus(true);
            }).catch((err) => {
                this.setState({showLoader: false});
                console.log(err);
            });
        }
    }
}

LoginComponent.propTypes = {
    isLoggedIn: PropTypes.bool,
    toggleLoginStatus: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        ...state.GlobalReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleLoginStatus: (status) => {
            dispatch(GlobalActions.toggleLoginStatus(status));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
