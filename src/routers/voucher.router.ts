import { Router } from "express";
import { CreateVoucherController, DeleteVoucherByIdController, EditVoucherByIdController, GetVoucherByEventIdController, GetVoucherByUserIdController } from "../controllers/voucher.controller";
import { EOGuard, VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.get('/events/:id', GetVoucherByEventIdController)
router.get('/users/:id', VerifyToken, GetVoucherByUserIdController)
// create voucher
router.post("/", VerifyToken, EOGuard, CreateVoucherController)
// update voucher
router.put("/:id", VerifyToken, EOGuard, EditVoucherByIdController)
// delete voucher
router.delete("/:id", VerifyToken, EOGuard, DeleteVoucherByIdController)


export default router;
