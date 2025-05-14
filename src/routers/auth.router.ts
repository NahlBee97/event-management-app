import { Router } from "express";
import { LoginController, RegisterController, ResetPasswordController, UpdateProfileController, VerifyAccountController, VerifyResetController } from "../controllers/auth.controller";
import { ReqValidator } from "../middlewares/validator.middleware";
import { loginSchema, registerSchema } from "../schemas/user.schema";
import { Multer } from "../utils/multer";
import { VerifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", ReqValidator(registerSchema), RegisterController);
router.post("/login", ReqValidator(loginSchema), LoginController);
router.patch("/avatar", VerifyToken, Multer().single("file"), UpdateProfileController);
router.patch("/verify", VerifyAccountController);
router.post("/resetverify", VerifyResetController);
router.patch("/reset", ResetPasswordController);

export default router;
