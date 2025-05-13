"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const user_schema_1 = require("../schemas/user.schema");
const router = (0, express_1.Router)();
// get all users
router.get("/", auth_middleware_1.VerifyToken, auth_middleware_1.EOGuard, user_controller_1.GetAllUserController);
// get user by id
router.get("/:id", auth_middleware_1.VerifyToken, user_controller_1.FindUserByIdController);
// edit user by id
router.put("/:id", (0, validator_middleware_1.ReqValidator)(user_schema_1.updateSchema), auth_middleware_1.VerifyToken, user_controller_1.EditUserByIdController);
// delete user by id
router.delete("/:id", auth_middleware_1.VerifyToken, user_controller_1.DeleteUserByIdController);
exports.default = router;
