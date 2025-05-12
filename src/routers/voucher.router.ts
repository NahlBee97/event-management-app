import { Router } from "express";
import { CreateVoucherController, DeleteVoucherByIdController, EditVoucherByIdController, GetVoucherByEventIdController, GetVoucherByUserIdController } from "../controllers/voucher.controller";
import { EOGuard, VerifyToken } from "../middlewares/auth.middleware";
import { ReqValidator } from "../middlewares/validator.middleware";
import { voucherSchema } from "../schemas/voucher.schema";

const router = Router();

//read
router.get('/events/:id', GetVoucherByEventIdController)
router.get('/users/:id', VerifyToken, GetVoucherByUserIdController)
// create voucher
router.post("/", ReqValidator(voucherSchema) ,VerifyToken, EOGuard, CreateVoucherController)
// update voucher
router.put("/:id", ReqValidator(voucherSchema), VerifyToken, EOGuard, EditVoucherByIdController)
// delete voucher
router.delete("/:id", VerifyToken, EOGuard, DeleteVoucherByIdController)


export default router;
