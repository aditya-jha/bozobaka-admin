/*
 created by aditya on 17-02-2017
 */

"use strict";

export const API_BASE = "http://52.3.133.9:3000/api";
export const LOGIN = "/users/login";
export const USER_PROFILE = "/profiles";
export const ADD_USER = "/users/addUser";
export const COURSES = "/courses";
export const COURSES_WITH_COUNT = "/courses/withCount";
export const REVIEWERS = "/profiles/reviewers";
export const CONTENT_WRITERS = "/profiles/contentWriters";
export const ADMINS = "/profiles/admins";
export const THEORY = "/theories";
export const SECTIONS = "/sections";
export const L1S = "/l1s";
export const L2S = "/l2s";
export const L3S = "/l3s";
export const L4s = "/l4s";
export const SOURCES = "/sources";
export const QUESTIONS = "/questions";
export const EXAMS = "/exams";
export const UPDATE_RANK = "/courses/updateRank";
export const MODULES = "/modules";
export const LINKS = "/links";

export function getCourseSectionEndpoint(courseId, sectionId) {
    let endPoint = COURSES + "/" + courseId + SECTIONS;
    return sectionId ? endPoint + "/" + sectionId : endPoint;
}

export function getL1Endpoint(sectionId, l1Id) {
    let endPoint = SECTIONS + "/" + sectionId + L1S;
    return l1Id ? endPoint + "/" + l1Id : endPoint;
}

export function getL2Endpoint(l1Id, l2Id) {
    let endPoint = L1S + "/" + l1Id + L2S;
    return l2Id ? endPoint + "/" + l2Id : endPoint;
}

export function getL3Endpoint(l2Id, l3Id) {
    let endPoint = L2S + "/" + l2Id + L3S;
    return l3Id ? endPoint + "/" + l3Id : endPoint;
}

export function getL4Endpoint(l3Id, l4Id) {
    let endPoint = L3S + "/" + l3Id + L4s;
    return l4Id ? endPoint + "/" + l4Id : endPoint;
}

export function getModulesEndpoint(courseId, moduleId) {
    let endPoint = COURSES + "/" + courseId + MODULES;
    return moduleId ? endPoint + "/" + moduleId : endPoint;
}

export function getLinksEndpoint(moduleId, linkId) {
    let endPoint = MODULES + "/" + moduleId + LINKS;
    return linkId ? endPoint + "/" + linkId : endPoint;
}
