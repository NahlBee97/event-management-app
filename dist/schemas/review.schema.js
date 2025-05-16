"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewSchema = void 0;
const zod_1 = require("zod");
exports.reviewSchema = zod_1.z.object({
    message: zod_1.z.string().nonempty("Message is required"),
    rating: zod_1.z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
});
