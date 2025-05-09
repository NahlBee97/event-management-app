"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// get all users
router.get("/", user_controller_1.GetAllUserController);
// get user by id
router.get("/:id", user_controller_1.FindUserByIdController);
// edit user by id
router.put("/:id", user_controller_1.EditUserByIdController);
// delete user by id
router.delete("/:id", user_controller_1.DeleteUserByIdController);
exports.default = router;
