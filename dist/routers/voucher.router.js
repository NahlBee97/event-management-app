"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const voucher_controller_1 = require("../controllers/voucher.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const voucher_schema_1 = require("../schemas/voucher.schema");
const router = (0, express_1.Router)();
//read
router.get('/events/:id', voucher_controller_1.GetVoucherByEventIdController);
router.get('/users/:id', auth_middleware_1.VerifyToken, voucher_controller_1.GetVoucherByUserIdController);
// create voucher
router.post("/", (0, validator_middleware_1.ReqValidator)(voucher_schema_1.voucherSchema), auth_middleware_1.VerifyToken, auth_middleware_1.EOGuard, voucher_controller_1.CreateVoucherController);
// update voucher
router.put("/:id", (0, validator_middleware_1.ReqValidator)(voucher_schema_1.voucherSchema), auth_middleware_1.VerifyToken, auth_middleware_1.EOGuard, voucher_controller_1.EditVoucherByIdController);
// delete voucher
router.delete("/:id", auth_middleware_1.VerifyToken, auth_middleware_1.EOGuard, voucher_controller_1.DeleteVoucherByIdController);
exports.default = router;
