import { Router } from "express";
import { EditUserByIdController, FindUserByIdController } from "../controllers/user.controller";

const router = Router();

// get user by id
router.get("/:id", FindUserByIdController);
// edit user by id
router.put("/:id", EditUserByIdController);

export default router;