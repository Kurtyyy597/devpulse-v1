"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressMap = void 0;
exports.sessionDashboard = sessionDashboard;
const getOverdueSessions_1 = require("./getOverdueSessions");
exports.progressMap = {
    planned: 0,
    open: 15,
    "in-progress": 30,
    halfway: 50,
    "almost-done": 75,
    completed: 100,
    closed: 0,
};
function sessionDashboard(sessions) {
    const activeSessions = sessions.filter((session) => session.deletedAt === null);
    const overdueSessions = (0, getOverdueSessions_1.getOverDueSessions)(activeSessions);
    const initial = {
        total: 0,
        totalDuration: 0,
        activityLength: 0,
        totalProgress: 0,
        upcomingDeadlines: 0,
        moodBreakdown: {
            tired: 0,
            distracted: 0,
            focused: 0,
            motivated: 0,
        },
        statusBreakdown: {
            planned: 0,
            open: 0,
            "in-progress": 0,
            halfway: 0,
            "almost-done": 0,
            completed: 0,
            closed: 0,
        },
    };
    const stats = activeSessions.reduce((acc, session) => {
        acc.total += 1;
        acc.totalDuration += session.duration;
        acc.activityLength +=
            (session.activities && session.activities.length) ?? 0;
        acc.statusBreakdown[session.status] += 1;
        acc.moodBreakdown[session.mood] += 1;
        acc.totalProgress += exports.progressMap[session.status];
        return acc;
    }, initial);
    const averageSession = stats.total === 0 ? 0 : stats.totalDuration / stats.total;
    const completionRate = stats.total === 0
        ? 0
        : (stats.statusBreakdown.completed / stats.total) * 100;
    const overallProgressStatus = stats.total === 0 ? 0 : stats.totalProgress / stats.total;
    const latestSession = [...sessions]
        .sort((a, b) => {
        const aCreated = a.createdAt;
        const bCreated = b.createdAt;
        return bCreated - aCreated;
    }).filter((s) => s.deletedAt == null)
        .slice(0, 5)
        .map((s) => ({
        id: s.id,
        title: s.title,
        status: s.status,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt ?? null,
    }));
    console.log("Sessions length:", overdueSessions.length);
    return {
        total: stats.total,
        totalDuration: stats.totalDuration,
        averageSession,
        completionRate,
        overallProgressStatus,
        upcomingDeadlines: stats.upcomingDeadlines,
        activityLength: stats.activityLength,
        statusBreakdown: stats.statusBreakdown,
        moodBreakdown: stats.moodBreakdown,
        latestSession,
        overdueSessions
    };
}
//# sourceMappingURL=sessionDashboard.js.map