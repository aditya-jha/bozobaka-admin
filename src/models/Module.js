/**
 * Created by aditya on 1/7/17.
 */

"use strict";

export default class Module {
    constructor(module) {
        this.id = module.id;
        this.name = module.name;
        this.displayName = module.displayName;
        this.active = module.active;
        this.sectionId = module.sectionId;
        this.l1Id = module.l1Id;
        this.courseId = module.courseId;
        this.description = module.description;
        this.created = module.created || new Date();
        this.updated = module.updated || new Date();
    }

    static parseModules(modules = []) {
        modules.map(module => new Module(module));
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
