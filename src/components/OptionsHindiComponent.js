/*
 * created by aditya on 12/11/17
 */

"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Row, Col} from "react-flexbox-grid";
import {
    questionAddOptionHindi,
    questionUpdateOptionHindi,
    questionRemoveOptionHindi
} from "./../actions/QuestionActions";
import Editor from "./EditorComponent";
import LivePreview from "./LivePreviewComponent";
import {parseKatex} from "./../services/KatexParser";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

class OptionsHindiComponent extends React.Component {
    constructor(props) {
        super(props);
        this.optionName = "ABCDEFGHIJKLMNOPQRSTUVZXYZ";
    }

    render() {
        const {optionsHindi, onChange, removeOption, addOptions} = this.props;

        return (
            <div>
                <h3>Options (Hindi)</h3>
                <br/>
                {optionsHindi.map((option, index) => (
                    <Row key={index.toString()}>
                        <Col xs={6}>
                            <Row>
                                <Col xs={6}>
                                    <h4>Option {this.optionName[index]} (Hindi)</h4>
                                </Col>
                                <Col xs={6}>
                                    <FlatButton secondary={true} label="Remove" onTouchTap={removeOption.bind(this, index)}/>
                                </Col>
                            </Row>
                            <Editor content={option.raw} placeHolder="option (hindi)" onChange={onChange.bind(this, index)}
                                    modules="optionsModules"/>
                        </Col>
                        <Col xs={6}>
                            <h4>Preview</h4>
                            <br/>
                            <LivePreview content={option.parsed}/>
                        </Col>
                        <Col xs={12}>
                            <br/>
                        </Col>
                    </Row>))
                }
                <RaisedButton label="Add Option (hindi)" onTouchTap={addOptions.bind(this)} primary={true}/>
            </div>
        );
    }
}

OptionsHindiComponent.propTypes = {
    optionsHindi: PropTypes.array,
    onChange: PropTypes.func,
    removeOption: PropTypes.func,
    addOptions: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        optionsHindi: state.question.optionsHindi
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addOptions: () => {
            dispatch(questionAddOptionHindi());
        },

        removeOption: (index) => {
            dispatch(questionRemoveOptionHindi(index));
        },

        onChange: (index, newValue) => {
            dispatch(questionUpdateOptionHindi(index, {
                raw: newValue,
                parsed: parseKatex(newValue)
            }));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsHindiComponent);

