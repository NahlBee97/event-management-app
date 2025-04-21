import { Router } from "express";
import { FindUserByIdController } from "../controllers/user.controller";

const router = Router();

router.get("/users/:id", FindUserByIdController );

export default router;