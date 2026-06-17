"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMood = isMood;
exports.isSort = isSort;
exports.isCategory = isCategory;
exports.isStatus = isStatus;
exports.isView = isView;
exports.parseSessionQuery = parseSessionQuery;
const filterSessions_1 = require("./../../types/filterSessions");
const Mood_1 = require("../../types/Mood");
const SortSessions_1 = require("../../types/SortSessions");
const TechnologyCategories_1 = require("../../types/TechnologyCategories");
const SessionStatus_1 = require("../../types/SessionStatus");
function isMood(value) {
    return Mood_1.moods.includes(value);
}
function isSort(value) {
    return SortSessions_1.sortSessions.includes(value);
}
function isCategory(value) {
    return TechnologyCategories_1.technologyCategories.includes(value);
}
function isStatus(value) {
    return SessionStatus_1.statuses.includes(value);
}
;
function isView(value) {
    return filterSessions_1.filterSessionView.includes(value);
}
function parseSessionQuery({ search, mood, sort, status, page, limit, view }) {
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);
    return {
        search: search ?? "",
        mood: mood !== undefined && isMood(mood) ? mood : "all",
        sort: sort !== undefined && isSort(sort) ? sort : "createdAt-asc",
        status: status !== undefined && isStatus(status) ? status : "all",
        page: Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
        limit: Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 5,
        view: view !== undefined && isView(view) ? view : "active"
    };
}
//# sourceMappingURL=getParseFilter.js.map