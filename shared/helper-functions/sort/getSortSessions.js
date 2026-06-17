"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortSessions = getSortSessions;
function getSortSessions(sort, sessions) {
    if (!sort)
        return sessions;
    const lastDashIndex = sort.lastIndexOf("-");
    const field = sort.slice(0, lastDashIndex);
    const direction = sort.slice(lastDashIndex + 1);
    return [...sessions].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (typeof aVal === "number" && typeof bVal === "number") {
            return direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        ;
        if (typeof aVal === "string" && typeof bVal === "string") {
            return direction === "asc" ?
                aVal.localeCompare(bVal) :
                bVal.localeCompare(aVal);
        }
        ;
        if (typeof aVal === "boolean" && typeof bVal === "boolean") {
            return direction === "asc" ?
                Number(aVal) - Number(bVal) :
                Number(bVal) - Number(aVal);
        }
        ;
        return 0;
    });
}
//# sourceMappingURL=getSortSessions.js.map