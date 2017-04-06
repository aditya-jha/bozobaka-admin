"use strict";

import APIService from "./APIService";
import APIEndpoints from "./../models/APIEndpoints";
import Course from "./../models/Course";
import Reviewer from "./../models/Reviewer";
import ContentWriter from "./../models/ContentWriter";
import Admin from "./../models/Admin";
import Section from "./../models/Section";
import L1 from "./../models/L1";
import L2 from "./../models/L2";
import L3 from "./../models/L3";

const ContentService = {
    fetchCourses(courseID) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: courseID ? APIEndpoints.coursesWithCount + "/" + courseID : APIEndpoints.coursesWithCount,
            }).then((res) => {
                resolve(Course.parseCourses(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateCourse(course, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.courses : APIEndpoints.courses + "/" + course.id,
                data: course
            }).then((res) => {
                (config.method !== "delete") ? resolve(new Course(res.data)) : resolve(res.data);
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    fetchAdmins() {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: APIEndpoints.admins
            }).then((res) => {
                resolve(Admin.parseAdmins(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    fetchReviewers() {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: APIEndpoints.reviewers,
            }).then((res) => {
                console.log(res.data);
                resolve(Reviewer.parseReviewers(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    fetchContentWriters() {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: "get",
                url: APIEndpoints.contentWriters,
            }).then((res) => {
                resolve(ContentWriter.parseContentWriters(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateAdmin(admin, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.addUser : APIEndpoints.admins + "/" + admin.id,
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
                        resolve(new Admin(res.data[0]))
                        break;
                    default:
                        reject("not handled");
                }
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateContentWriters(contentWriter, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.addUser : APIEndpoints.contentWriters + "/" + contentWriter.id,
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
                        resolve(new ContentWriter(res.data[0]))
                        break;
                    default:
                        reject("not handled");
                }
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateReviewers(reviewer, config) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: config.method,
                url: config.method === "post" ? APIEndpoints.addUser : APIEndpoints.reviewers + "/" + reviewer.id,
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
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    fetchSections(params) {
        return new Promise((resolve, reject) => {
           APIService.makeRequest({
               method: "get",
               url: APIEndpoints.allSections,
               params: {
                   filter: {
                       where: {
                           courseId: params.courseId
                       }
                   }
               }
           }).then((res) => {
                console.log(res.data);
                resolve(Section.parseSections(res.data));
           }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateSections(data, params) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: params.method,
                url: APIEndpoints.getCourseSectionEndpoint(params.courseId, params.sectionId),
                data: data
            }).then((res) => {
                console.log(res.data);
                resolve(new Section(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateL1(data, params) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: params.method,
                url: APIEndpoints.getL1Endpoint(params.sectionId, params.l1Id),
                data: data
            }).then((res) => {
                console.log(res.data);
                resolve(new L1(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateL2(data, params) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: params.method,
                url: APIEndpoints.getL2Endpoint(params.l1Id, params.l2Id),
                data: data
            }).then((res) => {
                resolve(new L2(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    },

    updateL3(data, params) {
        return new Promise((resolve, reject) => {
            APIService.makeRequest({
                method: params.method,
                url: APIEndpoints.getL3Endpoint(params.l2Id, params.l1Id),
                data: data
            }).then((res) => {
                console.log("update l3", res.data);
                resolve(new L2(res.data));
            }).catch((err) => APIService.errorHandler(reject, err));
        });
    }
};

export default ContentService;