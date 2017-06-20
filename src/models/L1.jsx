"use strict";

import L2 from "./L2";

export default class L1 {
    constructor(l1) {
        this.name = l1.name;
        this.displayName = l1.displayName;
        this.id = l1.id;
        this.sectionId = l1.sectionId;
        this.created = l1.created;
        this.updated = l1.updated;
        this.l2s = (l1.l2s && l1.l2s.length) ? L2.parseL2s(l1.l2s) : [];
    }

    static parseL1s(items = []) {
        return items.map(item => new L1(item));
    }
}
