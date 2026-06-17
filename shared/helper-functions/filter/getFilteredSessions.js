"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterSessions = getFilterSessions;
const normalizeText_1 = require("../normalizedText/normalizeText");
function getFilterSessions(filters, sessions) {
    const searchInput = (0, normalizeText_1.normalizeText)(filters.search ?? "");
    const filtered = sessions.filter((s) => {
        const searchableFields = [
            (0, normalizeText_1.normalizeText)(s.title),
            (0, normalizeText_1.normalizeText)(s.description ?? ""),
            (0, normalizeText_1.normalizeText)((s.skills ?? []).join(", ")),
            (0, normalizeText_1.normalizeText)(s.mood),
        ];
        if (searchInput &&
            !searchableFields.some((field) => field.includes(searchInput)))
            return false;
        if (filters.mood !== "all" && s.mood !== filters.mood)
            return false;
        if (filters.status !== "all" && s.status !== filters.status)
            return false;
        if (filters.view === "active" &&
            (s.deletedAt !== null || s.archivedAt !== null))
            return false;
        if (filters.view === "archived" &&
            (s.archivedAt === null || s.deletedAt !== null))
            return false;
        return true;
    });
    console.log("VIEW:", filters.view);
    console.log("FILTERED:", filtered);
    return filtered;
}
//# sourceMappingURL=getFilteredSessions.js.map