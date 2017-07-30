"use strict";

import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Col, Row} from "react-flexbox-grid";
import {questionUpdateAnswer} from "./../actions/QuestionActions";
import Checkbox from "material-ui/Checkbox";

export class MultiCorrectAnswerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {optionsCount, answer, onCheck} = this.props;
        const options = [];
        for (let i = 0; i < optionsCount; i = i + 1) {
            options.push({
                label: "Option " + (i + 1),
                value: i + 1
            });
        }
        return (
            <Row>
                {options.map((option, index) => (
                    <Col xs={6} sm={4} md={3} key={index}>
                        <Checkbox label={option.label} value={option.value}
                                  defaultChecked={answer.indexOf(index + 1) > -1} onCheck={onCheck.bind(this, index)}/>
                    </Col>
                ))}
            </Row>
        );
    }
}

MultiCorrectAnswerComponent.defaultProps = {
    answer: []
};

MultiCorrectAnswerComponent.propTypes = {
    answer: PropTypes.array,
    optionsCount: PropTypes.number,
    onCheck: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        answer: state.question.answer.multiple,
        optionsCount: state.question.options.length
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCheck: (index, event, checked) => {
            const actionType = checked ? -1 : index;
            dispatch(questionUpdateAnswer(index + 1, actionType));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiCorrectAnswerComponent);
