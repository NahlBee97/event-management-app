import { Router } from "express";
import { EditUserByIdController, FindUserByIdController } from "../controllers/user.controller";

const router = Router();

// get user by id
router.get("/auth/users/:id", FindUserByIdController);
// edit user by id
router.put("/auth/users/:id", EditUserByIdController);

export default router;