import { Router } from "express";
import {
  DeleteUserByIdController,
  EditUserByIdController,
  FindUserByIdController,
  GetAllUserController,
} from "../controllers/user.controller";
import { EOGuard, VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

// get all users
router.get("/", VerifyToken, EOGuard, GetAllUserController);
// get user by id
router.get("/:id", VerifyToken, FindUserByIdController);
// edit user by id
router.put("/:id", VerifyToken, EditUserByIdController);
// delete user by id
router.delete("/:id", VerifyToken, DeleteUserByIdController);

export default router;
