import { Router } from "express";
import { CreateVoucherController, DeleteVoucherByIdController, EditVoucherByIdController, GetVoucherByEventIdController, GetVoucherByUserIdController } from "../controllers/voucher.controller";

const router = Router();

router.get('/events/:id', GetVoucherByEventIdController)
router.get('/users/:id', GetVoucherByUserIdController)
// create voucher
router.post("/", CreateVoucherController)
// update voucher
router.put("/:id", EditVoucherByIdController)
// delete voucher
router.delete("/:id", DeleteVoucherByIdController)


export default router;
