/**
 * Created by aditya on 1/7/17.
 */

"use strict";

export default class LinkEntity {
    constructor(entity) {
        this.id = entity.id;
        this.entityId = entity.entityId;
        this.entityType = entity.entityType;
        this.description = entity.description;
        this.rank = entity.rank || 0;
        this.created = entity.created;
        this.updated = entity.updated;
        this.linkId = entity.linkId;
    }

    static parseLinkEntities(entities = []) {
        return entities.map(entity => new LinkEntity(entity)).sort(function (a, b) {
            return a.rank - b.rank;
        });
    }
}
