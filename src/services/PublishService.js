/**
 * Created by aditya on 1/7/17.
 */

"use strict";

import {makeRequest, errorHandler} from "./APIService";
import Module from "./../models/Module";
import Link from "./../models/Link";

import {
    getModulesEndpoint,
    getLinksEndpoint,
    getLinkEntityEndpoint,
    LINK_ENTITIES
} from "./../models/APIEndpoints";

export function fetchModules(courseId, moduleId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            url: getModulesEndpoint(courseId, moduleId)
        }).then(res => {
            const resolved = moduleId ? new Module(res.data) : Module.parseModules(res.data);
            resolve(resolved);
        }).catch(err => errorHandler(reject, err));
    });
}

export function updateModules(courseId, module, config) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: config.method,
            url: getModulesEndpoint(courseId, module.id),
            data: module
        }).then(res => {
            (config.method !== "delete") ? resolve(new Module(res.data)) : resolve(res.data);
        }).catch(err => errorHandler(reject, err));
    });
}

export function fetchLinks(moduleId, linkId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            url: getLinksEndpoint(moduleId, linkId) + "?filter={\"include\":[\"module\", \"linkEntities\"]}"
        }).then(res => {
            resolve(Link.parseLinks(res.data));
        }).catch(err => errorHandler(reject, err));
    });
}

export function updateLinks(link, config) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: config.method,
            url: getLinksEndpoint(link.moduleId, link.id),
            data: link
        }).then(res => {
            (config.method !== "delete") ? resolve(new Link(res.data)) : resolve(res.data);
        }).catch(err => errorHandler(reject, err));
    });
}

export function publishLinkEntity(linkId, entity) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: "post",
            url: getLinkEntityEndpoint(linkId),
            data: entity
        }).then(res => {
            resolve(res.data);
        }).catch(err => errorHandler(reject, err));
    });
}

export function deleteLinkEntity(entityId) {
    return new Promise((resolve, reject) => {
        makeRequest({
            method: "delete",
            url: LINK_ENTITIES + "/" + entityId
        }).then(res => {
            resolve(res.data);
        }).catch(err => errorHandler(reject, err));
    });
}
