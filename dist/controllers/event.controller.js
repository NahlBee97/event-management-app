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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllEventController = GetAllEventController;
exports.CreateEventController = CreateEventController;
exports.EditEventByIdController = EditEventByIdController;
exports.DeleteEventByIdController = DeleteEventByIdController;
const event_service_1 = require("../services/event.service");
const event_detail_services_1 = require("../services/event_detail.services");
function GetAllEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield (0, event_service_1.GetAllEventService)();
            res.status(200).send({
                message: 'Success',
                count: events.length,
                data: events
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function CreateEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newEvent = yield (0, event_service_1.CreateEventService)(req.body);
            res.status(200).send({
                message: "Create new event Success",
                data: newEvent,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function EditEventByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = parseInt(req.params.id);
            const updatedEvent = yield (0, event_service_1.EditEventByIdService)(eventId, req.body);
            res.status(200).send({
                message: `Edit Event by id ${eventId} Success`,
                data: updatedEvent,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function DeleteEventByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = parseInt(req.params.id);
            const deletedEvent = yield (0, event_detail_services_1.GetEventDetailByIdService)(req.params.id);
            yield (0, event_service_1.DeleteEventByIdService)(eventId);
            res.status(200).send({
                message: `Delete Event by id ${eventId} Success`,
                data: deletedEvent,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
