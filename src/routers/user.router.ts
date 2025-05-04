import { Router } from "express";
import {
  DeleteUserByIdController,
  EditUserByIdController,
  FindUserByIdController,
  GetAllUserController,
} from "../controllers/user.controller";

const router = Router();

// get all users
router.get("/", GetAllUserController);
// get user by id
router.get("/:id", FindUserByIdController);
// edit user by id
router.put("/:id", EditUserByIdController);
// delete user by id
router.delete("/:id", DeleteUserByIdController);

export default router;
