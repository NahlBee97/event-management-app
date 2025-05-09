import { Router } from "express";
import { GetVoucherByEventIdController, GetVoucherByUserIdController } from "../controllers/voucher.controller";

const router = Router();

router.get('/event/:id', GetVoucherByEventIdController)
router.get('/user/:id', GetVoucherByUserIdController)


export default router;
