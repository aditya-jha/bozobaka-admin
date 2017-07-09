/**
 * Created by aditya on 7/7/17.
 */

"use strict";

import Module from "./Module";

export default class Link {
    constructor(link) {
        this.name = link.name;
        this.displayName = link.displayName;
        this.moduleId = link.moduleId;
        this.created = link.created;
        this.updated = link.updated;

        if (link.module) {
            this.module = new Module(link.module);
        }
    }

    static parseLinks(links = []) {
        return links.map(link => new Link(link));
    }

    toJSON(proto) {
        let jsoned = {};
        let toConvert = proto || this;
        Object.getOwnPropertyNames(toConvert).forEach((prop) => {
            const val = toConvert[prop];
            // don't include those
            if (prop === "toJSON" || prop === "constructor") {
                return;
            }
            if (typeof val === "function") {
                jsoned[prop] = val.bind(jsoned);
                return;
            }
            jsoned[prop] = val;
        });

        const inherited = Object.getPrototypeOf(toConvert);
        if (inherited !== null) {
            Object.keys(this.toJSON(inherited)).forEach(key => {
                if (!!jsoned[key] || key === "constructor" || key === "toJSON") {
                    return;
                }
                if (typeof inherited[key] === "function") {
                    jsoned[key] = inherited[key].bind(jsoned);
                    return;
                }
                jsoned[key] = inherited[key];
            });
        }
        return jsoned;
    }
}
