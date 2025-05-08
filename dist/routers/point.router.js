"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const point_controller_1 = require("../controllers/point.controller");
const router = (0, express_1.Router)();
// get point by user id
router.get("/:user_id", point_controller_1.FindPointByUserIdController);
// update point on register done
// update point after transaction?
exports.default = router;
