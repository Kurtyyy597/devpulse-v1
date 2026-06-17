"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const zod_1 = require("zod");
const SessionStatus_1 = require("../types/SessionStatus");
const Mood_1 = require("../types/Mood");
exports.createSessionSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(4, "Title should not be below 4 characters")
        .max(50, "Maximum length is 50"),
    description: zod_1.z
        .string()
        .trim()
        .min(20, "Minimum description is 20")
        .max(200, "Maximum length is 200")
        .optional()
        .or(zod_1.z.literal("")),
    duration: zod_1.z.coerce
        .number()
        .int("Duration must be a number")
        .positive("Duration must be greater than 0")
        .optional(),
    skills: zod_1.z.array(zod_1.z.string()).optional(),
    mood: zod_1.z.enum(Mood_1.moods).optional(),
    status: zod_1.z.enum(SessionStatus_1.statuses).optional(),
    dueDate: zod_1.z
        .string()
        .optional()
        .or(zod_1.z.literal(""))
});
//# sourceMappingURL=createSessionSchemas.js.map