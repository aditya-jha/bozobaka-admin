/*
 created by aditya on 17-02-2017
 */

"use strict";

import {combineReducers} from "redux";

import GlobalReducer from "./GlobalReducer";
import ContentReducer from "./ContentReducer";
import {TheoryReducer} from "./TheoryReducer";
import {SectionsReducer} from "./SectionsReducer";
import {SourceReducer} from "./SourceReducer";
import {QuestionReducer} from "./QuestionReducer";
import {FilterReducer} from "./FiltersReducer";
import {ExamReducer} from "./ExamReducer";
import {PublishReducer} from "./PublishReducer";
import {ModulesReducer} from "./ModulesReducer";

export default combineReducers({
    GlobalReducer,
    ContentReducer,
    sections: SectionsReducer,
    theory: TheoryReducer,
    sources: SourceReducer,
    question: QuestionReducer,
    filters: FilterReducer,
    exam: ExamReducer,
    publish: PublishReducer,
    modules: ModulesReducer
});
