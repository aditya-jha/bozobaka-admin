"use strict";

import {makeRequest, errorHandler} from "./APIService";
import {
    COURSES_WITH_COUNT,
    COURSES,
    ADMINS,
    REVIEWERS,
    CONTENT_WRITERS,
    ADD_USER,
    SECTIONS,
    EXAMS,
    UPDATE_RANK,
    getCourseSectionEndpoint,
    getL1Endpoint,
    getL2Endpoint,
    getL3Endpoint,
    getL4Endpoint
} from "./../models/APIEndpoints";
import Course from "./../models/Course";
import Reviewer from "./../models/Reviewer";
import ContentWriter from "./../models/ContentWriter";
import Admin from "./../models/Admin";
import Section from "./../models/Section";
import L1 from "./../models/L1";
import L2 from "./../models/L2";
import L3 from "./../models/L3";
import L4 from "./../models/L4";
import Exam from "./../models/Exam";

const ContentService = {
    fetchCourses(courseId) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: "get",
                url: courseId ? COURSES_WITH_COUNT + "/" + courseId : COURSES_WITH_COUNT
            }).then((res) => {
                resolve(Course.parseCourses(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateCourse(course, config) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: config.method,
                url: config.method === "post" ? COURSES : COURSES + "/" + course.id,
                data: course
            }).then((res) => {
                (config.method !== "delete") ? resolve(new Course(res.data)) : resolve(res.data);
            }).catch((err) => errorHandler(reject, err));
        });
    },

    fetchAdmins() {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: "get",
                url: ADMINS
            }).then((res) => {
                resolve(Admin.parseAdmins(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    fetchReviewers() {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: "get",
                url: REVIEWERS
            }).then((res) => {
                resolve(Reviewer.parseReviewers(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    fetchContentWriters() {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: "get",
                url: CONTENT_WRITERS
            }).then((res) => {
                resolve(ContentWriter.parseContentWriters(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateAdmin(admin, config) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: config.method,
                url: config.method === "post" ? ADD_USER : ADMINS + "/" + admin.id,
                data: admin
            }).then((res) => {
                switch (config.method) {
                    case "delete":
                        resolve(res.data);
                        break;
                    case "post":
                        resolve(new Admin(res.data));
                        break;
                    case "put":
                        resolve(new Admin(res.data[0]));
                        break;
                    default:
                        reject("not handled");
                }
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateContentWriters(contentWriter, config) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: config.method,
                url: config.method === "post" ? ADD_USER : CONTENT_WRITERS + "/" + contentWriter.id,
                data: contentWriter
            }).then((res) => {
                switch (config.method) {
                    case "delete":
                        resolve(res.data);
                        break;
                    case "post":
                        resolve(new ContentWriter(res.data));
                        break;
                    case "put":
                        resolve(new ContentWriter(res.data[0]));
                        break;
                    default:
                        reject("not handled");
                }
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateReviewers(reviewer, config) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: config.method,
                url: config.method === "post" ? ADD_USER : REVIEWERS + "/" + reviewer.id,
                data: reviewer
            }).then((res) => {
                switch (config.method) {
                    case "delete":
                        resolve(res.data);
                        break;
                    case "post":
                        resolve(new Reviewer(res.data));
                        break;
                    case "put":
                        resolve(new Reviewer(res.data[0]));
                        break;
                    default:
                        reject("not handled");
                }
            }).catch((err) => errorHandler(reject, err));
        });
    },

    fetchSections(params) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: "get",
                url: SECTIONS,
                params: {
                    filter: {
                        where: {
                            courseId: params.courseId
                        }
                    }
                }
            }).then((res) => {
                resolve(Section.parseSections(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateSections(data, params) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: params.method,
                url: getCourseSectionEndpoint(params.courseId, params.sectionId),
                data: data
            }).then((res) => {
                resolve(new Section(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateL1(data, params) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: params.method,
                url: getL1Endpoint(params.sectionId, params.l1Id),
                data: data
            }).then((res) => {
                resolve(new L1(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateL2(data, params) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: params.method,
                url: getL2Endpoint(params.l1Id, params.l2Id),
                data: data
            }).then((res) => {
                resolve(new L2(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateL3(data, params) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: params.method,
                url: getL3Endpoint(params.l2Id, params.l3Id),
                data: data
            }).then((res) => {
                resolve(new L3(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateL4(data, params) {
        return new Promise((resolve, reject) => {
            makeRequest({
                method: params.method,
                url: getL4Endpoint(params.l3Id, params.l4Id),
                data: data
            }).then((res) => {
                resolve(new L4(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    fetchExams() {
        return new Promise((resolve, reject) => {
            makeRequest({
                url: EXAMS
            }).then((res) => {
                resolve(Exam.parseExams(res.data));
            }).catch((err) => errorHandler(reject, err));
        });
    },

    updateRank(data) {
        return new Promise((resolve, reject) => {
            makeRequest({
                url: UPDATE_RANK,
                data: data,
                method: "post"
            }).then((res) => {
                if (res.data.message === "done") {
                    resolve(res.data);
                } else {
                    reject(res.data);
                }
            }).catch((err) => errorHandler(reject, err));
        });
    }
};

export default ContentService;
