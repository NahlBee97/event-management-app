import { Router } from "express";
import { FindPointByUserIdController } from "../controllers/point.controller";

const router = Router();

// get point by user id
router.get("/points/:user_id", FindPointByUserIdController);

export default router;
