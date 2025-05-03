import { Router } from "express";
import { DeleteUserByIdController, EditUserByIdController, FindUserByIdController } from "../controllers/user.controller";

const router = Router();

// get user by id
router.get("/:id", FindUserByIdController);
// edit user by id
router.put("/:id", EditUserByIdController);
// delete
router.delete("/:id", DeleteUserByIdController);

export default router;