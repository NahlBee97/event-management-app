"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const event_controller_1 = require("../controllers/event.controller");
const event_detail_controller_1 = require("../controllers/event_detail.controller");
const search_events_controller_1 = require("../controllers/search_events.controller");
const router = (0, express_1.Router)();
//create
router.post('/', event_controller_1.CreateEventController);
//read
router.get('/', event_controller_1.GetAllEventController);
router.get("/search", search_events_controller_1.SearchEventController);
router.get("/detail/:id", event_detail_controller_1.GetEventDetailByIdController);
router.get("/categories", categories_controller_1.GetAllCategoriesController);
//update
router.post('/:id', event_controller_1.EditEventByIdController);
//delete
router.delete('/:id', event_controller_1.DeleteEventByIdController);
exports.default = router;
