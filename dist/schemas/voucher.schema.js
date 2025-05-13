"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherSchema = void 0;
const zod_1 = require("zod");
exports.voucherSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Name is required"),
    event_id: zod_1.z.number().int().positive("Event ID must be a positive integer"),
    description: zod_1.z.string().nonempty("Description is required"),
    tnc_description: zod_1.z
        .string()
        .nonempty("Terms and conditions description is required"),
    discount_percentage: zod_1.z
        .number()
        .min(0, "Discount percentage must be at least 0")
        .max(100, "Discount percentage must be at most 100"),
    start_date: zod_1.z.date(),
    expired_date: zod_1.z.date(),
    code: zod_1.z.string().nonempty("Code is required"),
    max_usage: zod_1.z.number().int().positive("Max usage must be a positive integer"),
    current_usage: zod_1.z
        .number()
        .int()
        .nonnegative("Current usage must be a non-negative integer"),
});
