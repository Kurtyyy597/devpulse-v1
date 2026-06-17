"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
function paginate(items, page, limit) {
    const total = items.length > 0 ? items.length : 0;
    const totalPages = Math.max(1, (Math.ceil(total / limit)));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = items.slice(startIndex, endIndex);
    const pagination = {
        totalSessions: total,
        totalPages,
        limit,
        page,
        hasNext: page < totalPages,
        hasPrevious: page > 1
    };
    return {
        data,
        pagination
    };
}
//# sourceMappingURL=paginate.js.map