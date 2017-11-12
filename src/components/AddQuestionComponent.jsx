"use strict";

import React, {PropTypes} from "react";
import {Col, Row} from "react-flexbox-grid";
import SectionSelectionComponent from "./SectionSelectionComponent";
import {
    questionUpdateL1,
    questionUpdateL2,
    questionUpdateL3,
    questionUpdateL4,
    questionUpdateSection,
    questionUpdateSource
} from "./../actions/QuestionActions";
import L1SelectionComponent from "./L1SelectionComponent";
import L2SelectionComponent from "./L2SelectionComponent";
import L3SelectionComponent from "./L3SelectionComponent";
import L4SelectionComponent from "./L4SelectionComponent";
import SourceSelectionComponent from "./SourceSelectionComponent";
import AddSourceComponent from "./AddSourceComponent";
import TextField from "material-ui/TextField";
import Snackbar from "material-ui/Snackbar";
import {resetVariables} from "./../services/KatexParser";
import EditorComponent from "./EditorComponent";
import LivePreviewComponent from "./LivePreviewComponent";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import DropdownDisplay from "./DropdownDisplayComponent";
import OptionsComponent from "./OptionsComponent";
import SingleCorrectAnswer from "./SingleCorrectAnswerComponent";
import MultiCorrectAnswer from "./MultiCorrectAnswerComponent";
import ExamsAppearedComponent from "./ExamsAppearedComponent";
import CircularProgress from "material-ui/CircularProgress";

export default class AddQuestionComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id} = this.props.location.query;
        if (id) {
            this.props.fetchQuestion(id);
        }
    }

    componentWillUnmount() {
        resetVariables();
        this.props.resetState();
    }

    render() {
        const {
            difficulty, onDifficultyChange, l1Id, l2Id, l3Id, l4Id, sectionId, status, sourceId, id,
            postQuestion, hasErrored, errorMessage, question, updateQuestion, parsedQuestion, isLoading, questionTypes,
            questionType, onQuestionTypeChange, updateSolution, updateHint, solution, hint, resetErrorState, userRole,
            requestSuccess, resetState
        } = this.props;

        let AnswerComponent;
        switch (questionType) {
            case "multiple":
                AnswerComponent = <MultiCorrectAnswer/>;
                break;
            default:
                AnswerComponent = <SingleCorrectAnswer/>;
        }

        return (
            <div>
                <br/>
                <Row>
                    <Col xs={8}>
                        <h2>Add Question</h2>
                        {id ? <p><br/>ID: <b>{id}</b></p> : null}
                    </Col>
                    <Col xs={4}>
                        {isLoading ? <CircularProgress size={32}/> : null}
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h3>Section</h3>
                        <SectionSelectionComponent sectionId={sectionId}
                                                   actionOnUpdate={questionUpdateSection.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={5}>
                        <h3>Source</h3>
                        <SourceSelectionComponent actionOnUpdate={questionUpdateSource.bind(this)} source={sourceId}/>
                    </Col>
                    <Col xs={12} sm={5}>
                        <br/>
                        <AddSourceComponent/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <h3>Question Type</h3>
                        <DropdownDisplay onChange={onQuestionTypeChange.bind(this)} menuItems={questionTypes}
                                         value={questionType} hideDefault={true}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12} sm={6} md={7}>
                        <h3>Question</h3>
                        <EditorComponent content={question} onChange={updateQuestion.bind(this)}
                                         placeHolder="Enter Question"/>
                    </Col>
                    <Col xs={12} sm={6} md={5}>
                        <h3>Question Preview</h3>
                        <LivePreviewComponent content={parsedQuestion}/>
                    </Col>
                </Row>
                <br/><br/>
                <OptionsComponent/>
                <br/><br/>
                <Row>
                    <Col xs={12} sm={6} md={7}>
                        <h3>Solution</h3>
                        <EditorComponent content={solution.raw} onChange={updateSolution.bind(this)}
                                         placeHolder="Enter Solution"/>
                    </Col>
                    <Col xs={12} sm={6} md={5}>
                        <h3>Solution Preview</h3>
                        <LivePreviewComponent content={solution.parsed}/>
                    </Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col xs={12} sm={6} md={7}>
                        <h3>Hint</h3>
                        <EditorComponent content={hint.raw} onChange={updateHint.bind(this)}
                                         placeHolder="Enter Hint"/>
                    </Col>
                    <Col xs={12} sm={6} md={5}>
                        <h3>Hint Preview</h3>
                        <LivePreviewComponent content={hint.parsed}/>
                    </Col>
                </Row>
                <br/><br/>
                {AnswerComponent}
                <br/><br/>
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L1</h3>
                        <L1SelectionComponent sectionId={sectionId} l1Id={l1Id}
                                              actionOnUpdate={questionUpdateL1.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L2</h3>
                        <L2SelectionComponent l1Id={l1Id} l2Id={l2Id} actionOnUpdate={questionUpdateL2.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L3</h3>
                        <L3SelectionComponent l2Id={l2Id} l3Id={l3Id} actionOnUpdate={questionUpdateL3.bind(this)}/>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h3>L4</h3>
                        <L4SelectionComponent l4Id={l4Id} l3Id={l3Id} actionOnUpdate={questionUpdateL4.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col xs={12}>
                        <TextField title="Difficulty" hintText="Set Difficulty" type="number" value={difficulty}
                                   floatingLabelText="Difficulty" onChange={onDifficultyChange.bind(this)}
                                   min="0" max="100"/>
                    </Col>
                </Row>
                <br/>
                {/*<Row>*/}
                {/*<Col xs={12}>*/}
                {/*<h3>Status</h3>*/}
                {/*<StatusSelectionComponent actionOnUpdate={questionUpdateStatus.bind(this)} status={status}/>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                <br/><br/>
                <ExamsAppearedComponent/>
                <br/><br/>

                <Row>
                    <Col xs={12}>Status: <b>{status}</b></Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col sm={3}>
                        <FlatButton disabled={isLoading || !id} secondary={true} label="Discard"
                                    onClick={postQuestion.bind(this, "trash")}/>
                    </Col>
                    <Col sm={3} smOffset={3}>
                        {userRole === "reviewer" ?
                            <FlatButton disabled={isLoading} primary={true} label="LATER"
                                        onClick={postQuestion.bind(this, "later")}/>
                            :
                            <FlatButton disabled={isLoading} primary={true} label="SAVE DRAFT"
                                        onClick={postQuestion.bind(this, "draft")}/>
                        }
                    </Col>
                    <Col sm={3}>
                        {userRole === "reviewer" ?
                            <RaisedButton disabled={isLoading} primary={true} label="ACCEPT"
                                          onClick={postQuestion.bind(this, "accept")}/>
                            :
                            <RaisedButton disabled={isLoading} primary={true} label="ADD"
                                          onClick={postQuestion.bind(this, "added")}/>
                        }
                    </Col>
                </Row>
                <br/><br/><br/>
                <Snackbar open={hasErrored} message={errorMessage} autoHideDuration={200000} action="ok"
                          onActionTouchTap={resetErrorState.bind(this)}/>
                <Snackbar open={requestSuccess} message="done" autoHideDuration={200000} action="ok"
                          onActionTouchTap={resetState.bind(this)}/>
            </div>
        );
    }
}

AddQuestionComponent.propTypes = {
    difficulty: PropTypes.number,
    hasErrored: PropTypes.bool,
    errorMessage: PropTypes.string,
    isLoading: PropTypes.bool,
    postQuestion: PropTypes.func,
    resetState: PropTypes.func,
    status: PropTypes.string,
    sectionId: PropTypes.string,
    l1Id: PropTypes.string,
    l2Id: PropTypes.string,
    l3Id: PropTypes.string,
    l4Id: PropTypes.string,
    parsedQuestion: PropTypes.node,
    question: PropTypes.string,
    updateQuestion: PropTypes.func,
    sourceId: PropTypes.string,
    onDifficultyChange: PropTypes.func,
    id: PropTypes.string,
    fetchQuestion: PropTypes.func,
    location: PropTypes.object,
    questionTypes: PropTypes.array,
    questionType: PropTypes.string,
    onQuestionTypeChange: PropTypes.func,
    updateSolution: PropTypes.func,
    updateHint: PropTypes.func,
    solution: PropTypes.object,
    hint: PropTypes.object,
    resetErrorState: PropTypes.func,
    userRole: PropTypes.string,
    requestSuccess: PropTypes.bool
};
