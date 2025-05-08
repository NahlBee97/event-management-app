"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const voucher_controller_1 = require("../controllers/voucher.controller");
const router = (0, express_1.Router)();
router.get('/events/:id', voucher_controller_1.GetVoucherByEventIdController);
router.get('/users/:id', voucher_controller_1.GetVoucherByUserIdController);
// create voucher
router.post("/", voucher_controller_1.CreateVoucherController);
// update voucher
router.put("/:id", voucher_controller_1.EditVoucherByIdController);
// delete voucher
router.delete("/:id", voucher_controller_1.DeleteVoucherByIdController);
exports.default = router;
