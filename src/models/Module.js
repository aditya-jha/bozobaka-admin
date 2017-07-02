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
        let parsedModules = [];
        modules.forEach(module => {
            parsedModules.push(new Module(module));
        });
        return parsedModules;
    }
}
