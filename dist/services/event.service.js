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
exports.GetAllEventService = GetAllEventService;
exports.CreateEventService = CreateEventService;
exports.EditEventByIdService = EditEventByIdService;
exports.DeleteEventByIdService = DeleteEventByIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
function GetAllEventService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield prisma_1.default.events.findMany();
            if (!events)
                throw new Error('Events not found');
            return events;
        }
        catch (err) {
            throw err;
        }
    });
}
function CreateEventService(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, category_id, start_date, end_date, total_seats, remaining_seats, price, } = bodyData;
            const newEvent = yield prisma_1.default.events.create({
                data: {
                    name: name,
                    description: description,
                    category_id: category_id,
                    start_date: start_date,
                    end_date: end_date,
                    total_seats: total_seats,
                    remaining_seats: remaining_seats,
                    price: price,
                },
            });
            return newEvent;
        }
        catch (err) {
            throw err;
        }
    });
}
function EditEventByIdService(eventId, bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, description, category_id, start_date, end_date, total_seats, remaining_seats, price } = bodyData;
            const event = yield prisma_1.default.events.findFirst({
                where: {
                    id: eventId
                }
            });
            if (!event)
                throw new Error("This event does not exist");
            const updatedEvent = yield prisma_1.default.events.update({
                where: {
                    id: eventId
                },
                data: {
                    name: name || event.name,
                    description: description || event.description,
                    category_id: category_id || event.category_id,
                    start_date: start_date || event.start_date,
                    end_date: end_date || event.end_date,
                    total_seats: total_seats || event.total_seats,
                    remaining_seats: remaining_seats || event.remaining_seats,
                    price: price || event.price
                }
            });
            return updatedEvent;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteEventByIdService(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //delete voucher
            const eventVoucher = yield prisma_1.default.event_vouchers.findFirst({
                where: {
                    event_id: eventId
                }
            });
            if (eventVoucher) {
                yield prisma_1.default.event_vouchers.deleteMany({
                    where: {
                        event_id: eventId
                    }
                });
            }
            //delete riview
            const eventReview = yield prisma_1.default.review.findFirst({
                where: {
                    event_id: eventId,
                },
            });
            if (eventReview) {
                yield prisma_1.default.review.deleteMany({
                    where: {
                        event_id: eventId,
                    },
                });
            }
            //delete transaction
            const eventTransaction = yield prisma_1.default.transactions.findFirst({
                where: {
                    event_id: eventId,
                },
            });
            if (eventTransaction) {
                yield prisma_1.default.transactions.deleteMany({
                    where: {
                        event_id: eventId,
                    },
                });
            }
            //delete event
            yield prisma_1.default.events.delete({
                where: {
                    id: eventId,
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
