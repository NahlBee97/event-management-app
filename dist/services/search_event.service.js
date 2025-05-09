"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchEventService = SearchEventService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function SearchEventService(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category, start_date, end_date, min_price, max_price } = params;
            const filters = {};
            if (category) {
                filters.event_category = {
                    category: category,
                };
            }
            if (start_date) {
                filters.start_date = {
                    gte: new Date(start_date), // format ISO seperti yang kamu kasih
                };
            }
            if (end_date) {
                filters.end_date = {
                    lte: new Date(end_date),
                };
            }
            if (min_price || max_price) {
                filters.price = Object.assign(Object.assign({}, (min_price && { gte: parseFloat(min_price) })), (max_price && { lte: parseFloat(max_price) }));
            }
            const events = yield prisma_1.default.events.findMany({
                where: Object.assign({}, filters),
                include: {
                    event_category: true,
                },
            });
            if (!events)
                throw new Error(`Event not found`);
            return events;
        }
        catch (error) {
            throw error;
        }
    });
}
