import { Router } from "express";
import { GetVoucherByEventIdController } from "../controllers/voucher.controller";

const router = Router();

router.get('/:id', GetVoucherByEventIdController)


export default router;
