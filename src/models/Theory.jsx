"use strict";

import {getDateWithoutTime} from "./../utils/dateTimeUtils";

export default class Theory {
    constructor(theory) {
        this.id = theory.id;
        this.sectionId = theory.sectionId;
        this.section = theory.section || [];
        this.l1Id = theory.l1Id;
        this.l1 = theory.l1 || {};
        this.l2Id = theory.l2Id;
        this.l2 = theory.l2 || {};
        this.l3Id = theory.l3Id;
        this.l3 = theory.l3 || {};
        this.l4 = theory.l4 || {};
        this.l4Id = theory.l4Id;
        this.heading = theory.heading;
        this.theory = theory.theory;
        this.status = theory.status;
        this.type = theory.type;
        this.rank = theory.rank;
        this.sourceId = theory.sourceId;
        this.source = theory.source || {};
        this.created = theory.created ? getDateWithoutTime(theory.created) : "";
        this.theoryHindi = theory.theoryHindi;
        this.headingHindi = theory.headingHindi;
    }

    static parseTheories(theories = []) {
        let parsedTheories = [];
        theories.forEach((theory) => {
            parsedTheories.push(new Theory(theory));
        });
        return parsedTheories;
    }

    static validateTheory(theory) {
        let validatedTheory = new Theory(theory);
        delete validatedTheory.created;
        delete validatedTheory.l1;
        delete validatedTheory.l2;
        delete validatedTheory.l3;
        delete validatedTheory.l4;
        delete validatedTheory.section;
        delete validatedTheory.source;
        if (!validatedTheory.sectionId || !validatedTheory.l1Id || !validatedTheory.l2Id ||
            !validatedTheory.l3Id || !validatedTheory.heading || !validatedTheory.theory) {
            throw new Error("Invalid Theory Input");
        }
        return validatedTheory;
    }
}
