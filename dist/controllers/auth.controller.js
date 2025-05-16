"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = RegisterController;
exports.LoginController = LoginController;
exports.UpdateProfileController = UpdateProfileController;
exports.VerifyAccountController = VerifyAccountController;
exports.ResetPasswordController = ResetPasswordController;
exports.VerifyResetController = VerifyResetController;
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
function RegisterController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyData = req.body;
            const newUser = yield (0, auth_service_1.RegisterService)(bodyData);
            res.status(200).send({
                message: `Register success`,
                data: newUser,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function LoginController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyData = req.body;
            const data = yield (0, auth_service_1.LoginService)(bodyData);
            res
                .status(200)
                .cookie("access_token", data.token)
                .send({
                message: "Login Success",
                data: data.user,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function UpdateProfileController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { file } = req;
            const { email } = req.user;
            if (!file)
                throw new Error("File not found");
            if (!email)
                throw new Error("Email not found");
            yield (0, user_service_1.UpdateUserService)(file, email);
            res.status(200).send({
                message: `Update Profile success`,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function VerifyAccountController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.body.token;
            yield (0, auth_service_1.VerifyAccountService)(token);
            res.status(200).send({
                message: `Verify account success`,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function ResetPasswordController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { new_password, token } = req.body;
            yield (0, auth_service_1.ResetPasswordService)(new_password, token);
            res.status(200).send({
                message: `Reset password success`,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function VerifyResetController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            yield (0, auth_service_1.VerifyResetService)(email);
        }
        catch (err) {
            next(err);
        }
    });
}
