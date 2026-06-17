"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverDueSessions = void 0;
const getOverDueSessions = (sessions) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return sessions.filter((s) => {
        if (!s.dueDate)
            return false;
        const dueDate = new Date(s.dueDate);
        return (dueDate < today &&
            s.status !== "completed" &&
            s.status !== "closed");
    }).sort((a, b) => {
        const aDate = new Date(a?.dueDate).getTime();
        const bDate = new Date(b?.dueDate).getTime();
        return aDate - bDate;
    }).slice(0, 5);
};
exports.getOverDueSessions = getOverDueSessions;
//# sourceMappingURL=getOverdueSessions.js.map