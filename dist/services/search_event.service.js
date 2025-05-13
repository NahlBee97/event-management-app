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
function toLocalISOString(date, timeZone) {
    const localString = date.toLocaleString("sv-SE", {
        timeZone,
        hour12: false,
    });
    return localString.replace(" ", "T") + ".000";
}
function SearchEventService(params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category_id, start_date, end_date, min_price, max_price, organizer_id } = params;
            const filters = {};
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (category_id) {
                filters.category_id = Number(category_id);
            }
            if (start_date) {
                const localStartDate = new Date(start_date);
                filters.start_date = { gte: new Date(toLocalISOString(localStartDate, userTimeZone)) };
            }
            if (end_date) {
                const localEndDate = new Date(end_date);
                filters.end_date = { lte: new Date(toLocalISOString(localEndDate, userTimeZone)) };
            }
            if (min_price || max_price) {
                filters.price = Object.assign(Object.assign({}, (min_price && { gte: parseFloat(min_price) })), (max_price && { lte: parseFloat(max_price) }));
            }
            if (organizer_id) {
                filters.organizer_id = Number(organizer_id);
            }
            const events = yield prisma_1.default.events.findMany({
                where: Object.assign({}, filters),
                include: {
                    event_category: true,
                },
            });
            if (!events)
                throw new Error(`Event not found`);
            const eventsWithLocalTime = events.map(event => {
                return Object.assign(Object.assign({}, event), { start_date: toLocalISOString(new Date(event.start_date), userTimeZone), end_date: toLocalISOString(new Date(event.end_date), userTimeZone) });
            });
            return eventsWithLocalTime;
        }
        catch (error) {
            throw error;
        }
    });
}
