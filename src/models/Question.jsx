"use strict";

import {getDateWithoutTime} from "./../utils/dateTimeUtils";

export default class Question {
    constructor(question) {
        this.id = question.id;
        this.sectionId = question.sectionId;
        this.section = question.section || {};
        this.l1Id = question.l1Id;
        this.l1 = question.l1 || {};
        this.l2Id = question.l2Id;
        this.l2 = question.l2 || {};
        this.l3Id = question.l3Id;
        this.l3 = question.l3 || {};
        this.l4Id = question.l4Id;
        this.l4 = question.l4 || {};
        this.question = question.question;
        this.questionHindi = question.questionHindi;
        this.status = question.status;
        this.type = question.type || question.questionType;
        this.options = question.options.map((option) => ({
            raw: typeof option.raw !== "undefined" ? option.raw : option
        }));

        if (question.optionsHindi) {
            this.optionsHindi = question.optionsHindi.map(option => ({
                raw: typeof option.raw !== "undefined" ? option.raw : option
            }));
        } else {
            this.optionsHindi = [];
        }

        this.answer = question.answer;
        this.appearedIn = question.appearedInExams || question.appearedIn;
        this.solution = {
            raw: typeof question.solution.raw !== "undefined" ? question.solution.raw : question.solution
        };
        this.solutionHindi = {
            raw: typeof question.solutionHindi.raw !== "undefined" ? question.solutionHindi.raw : question.solutionHindi
        };
        this.hint = {
            raw: typeof question.hint.raw !== "undefined" ? question.hint.raw : question.hint
        };
        this.hintHindi = {
            raw: typeof question.hintHindi.raw !== "undefined" ? question.hintHindi.raw : question.hintHindi
        };

        this.difficulty = question.difficulty;
        this.sourceId = question.sourceId;
        this.rank = question.rank;
        if (question.source) {
            this.source = question.source;
        }
        this.created = question.created ? getDateWithoutTime(question.created) : "";
        this.updated = question.updated;
    }

    static parseQuestions(questions = []) {
        let parsedQuestions = [];
        questions.forEach(question => {
            parsedQuestions.push(new Question(question));
        });
        return parsedQuestions;
    }

    static validateQuestion(question) {
        let validatedQuestion = new Question(question);
        validatedQuestion.solution = validatedQuestion.solution.raw;
        validatedQuestion.solutionHindi = validatedQuestion.solutionHindi.raw;
        validatedQuestion.hint = validatedQuestion.hint.raw;
        validatedQuestion.hintHindi = validatedQuestion.hintHindi.raw;
        validatedQuestion.options = validatedQuestion.options.map((option) => (option.raw));
        validatedQuestion.optionsHindi = validatedQuestion.optionsHindi.map((option) => (option.raw));
        validatedQuestion.appearedInExams = validatedQuestion.appearedIn;
        delete validatedQuestion.source;
        delete validatedQuestion.appearedIn;
        delete validatedQuestion.l3;
        delete validatedQuestion.l1;
        delete validatedQuestion.l2;
        delete validatedQuestion.l4;
        delete validatedQuestion.section;
        delete validatedQuestion.created;
        delete validatedQuestion.updated;
        if (!validatedQuestion.sectionId || !validatedQuestion.l1Id || !validatedQuestion.l2Id ||
            !validatedQuestion.l3Id || !validatedQuestion.question || !validatedQuestion.questionHindi) {
            throw new Error("Invalid Question Input");
        }
        return validatedQuestion;
    }
}
