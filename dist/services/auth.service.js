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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByEmail = FindUserByEmail;
exports.RegisterService = RegisterService;
exports.VerifyAccountService = VerifyAccountService;
exports.LoginService = LoginService;
exports.ResetPasswordService = ResetPasswordService;
exports.VerifyResetService = VerifyResetService;
const config_1 = require("../config");
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const nodemailer_1 = require("../utils/nodemailer");
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function FindUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    email,
                },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function Register(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { first_name, last_name, email, password, role } = bodyData;
            const user = yield FindUserByEmail(email);
            if (user)
                throw new Error("Email already registered");
            const salt = (0, bcrypt_1.genSaltSync)(10);
            const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
            function referralGenerator() {
                const yearNow = String(new Date().getFullYear());
                const referral_code = "REF" + first_name.toUpperCase() + yearNow;
                return referral_code;
            }
            const templatePath = path_1.default.join(__dirname, "../templates", "register-template.hbs");
            const templateSource = fs_1.default.readFileSync(templatePath, "utf-8");
            const compiledTemplate = handlebars_1.default.compile(templateSource);
            const newUser = yield prisma_1.default.users.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                    referral_code: referralGenerator(),
                },
            });
            const payload = {
                email: newUser.email,
            };
            const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "24h" });
            const html = compiledTemplate({
                first_name,
                email,
                fe_url: `${config_1.FE_URL}/verify?token=${token}`,
            });
            yield nodemailer_1.Transporter.sendMail({
                from: "EOHelper",
                to: email,
                subject: "Welcome",
                html,
            });
            return newUser;
        }
        catch (err) {
            throw err;
        }
    });
}
function VerifyAccount(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = (0, jsonwebtoken_1.verify)(token, String(config_1.SECRET_KEY));
            yield prisma_1.default.users.update({
                where: {
                    email,
                },
                data: {
                    isverivied: true,
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateReferralLogs(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, referral_code_used } = bodyData;
            //check if referrer exist
            const referrer = yield prisma_1.default.users.findFirst({
                where: {
                    referral_code: referral_code_used,
                },
            });
            if (!referrer)
                throw new Error("Can not find referrer");
            //update referral logs
            const user = yield FindUserByEmail(email);
            if (!user)
                throw new Error("Can not find the user");
            yield prisma_1.default.referral_logs.create({
                data: {
                    user_id: user.id,
                    referral_code_used: referral_code_used,
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdatePoint(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { referral_code_used } = bodyData;
            // find referrer
            const referrer = yield prisma_1.default.users.findFirst({
                where: {
                    referral_code: referral_code_used,
                },
            });
            if (!referrer)
                throw new Error("Can not find referrer");
            //create default referrer point
            const currentDate = new Date();
            const expiredAt = new Date(currentDate.setMonth(currentDate.getMonth() + 3));
            yield prisma_1.default.points.create({
                data: {
                    user_id: referrer.id,
                    points: 0,
                    expired_at: expiredAt,
                },
            });
            //see referrer point
            let referrerPoint = yield prisma_1.default.points.findFirst({
                select: {
                    points: true,
                },
                where: {
                    user_id: referrer.id,
                },
            });
            if (!referrerPoint) {
                referrerPoint = { points: 0 };
            }
            // Update referrer points
            referrerPoint.points += 10000;
            yield prisma_1.default.points.update({
                where: {
                    user_id: referrer.id,
                },
                data: {
                    points: referrerPoint.points,
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
//give coupon
function GiveCoupon(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = bodyData;
            const user = yield FindUserByEmail(email);
            if (!user)
                throw new Error("Can not find user");
            function CodeGenerator() {
                const code = "COUPON" + (user === null || user === void 0 ? void 0 : user.first_name);
                return code;
            }
            yield prisma_1.default.coupons.create({
                data: {
                    user_id: user.id,
                    discount_percentage: 5,
                    code: CodeGenerator(),
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
function Login(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = bodyData;
            const user = yield FindUserByEmail(email);
            if (!user)
                throw new Error("Email does not exist");
            const checkPass = yield (0, bcrypt_1.compare)(password, user.password);
            if (!checkPass)
                throw new Error("Wrong Password");
            const payload = {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                profile_picture: user.profile_picture,
            };
            const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "1h" });
            return { user: payload, token };
        }
        catch (err) {
            throw err;
        }
    });
}
function VerifyReset(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const templatePath = path_1.default.join(__dirname, "../templates", "verify-reset-template.hbs");
            const payload = {
                email,
            };
            const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "24h" });
            const templateSource = fs_1.default.readFileSync(templatePath, "utf-8");
            const compiledTemplate = handlebars_1.default.compile(templateSource);
            const html = compiledTemplate({
                email,
                fe_url: `${config_1.FE_URL}/reset-password?token=${token}`,
            });
            yield nodemailer_1.Transporter.sendMail({
                from: "EOHelper",
                to: email,
                subject: "Reset Password",
                html,
            });
        }
        catch (err) {
            throw err;
        }
    });
}
function ResetPassword(new_password, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = (0, jsonwebtoken_1.verify)(token, String(config_1.SECRET_KEY));
            const user = yield FindUserByEmail(email);
            if (!user)
                throw new Error("User does not exist");
            const salt = (0, bcrypt_1.genSaltSync)(10);
            const hashedPassword = yield (0, bcrypt_1.hash)(new_password, salt);
            yield prisma_1.default.users.update({
                where: {
                    email,
                },
                data: {
                    password: hashedPassword,
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
function RegisterService(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield Register(bodyData);
            if (bodyData.referral_code_used) {
                //update referral log
                yield UpdateReferralLogs(bodyData);
                //update referrer point
                yield UpdatePoint(bodyData);
                //give coupon
                yield GiveCoupon(bodyData);
            }
            return newUser;
        }
        catch (err) {
            throw err;
        }
    });
}
function VerifyAccountService(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield VerifyAccount(token);
        }
        catch (err) {
            throw err;
        }
    });
}
function LoginService(bodyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield Login(bodyData);
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function ResetPasswordService(new_password, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ResetPassword(new_password, token);
        }
        catch (err) {
            throw err;
        }
    });
}
function VerifyResetService(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield VerifyReset(email);
        }
        catch (err) {
            throw err;
        }
    });
}
