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
exports.RegisterService = RegisterService;
exports.LoginService = LoginService;
const config_1 = require("../config");
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
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
                throw new Error("The email you are using is already exist");
            return yield prisma_1.default.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                function referralGenerator() {
                    const yearNow = String(new Date().getFullYear());
                    const referral_code = "REF" + first_name.toUpperCase() + yearNow;
                    return referral_code;
                }
                const salt = (0, bcrypt_1.genSaltSync)(10);
                const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
                const newUser = yield t.users.create({
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
                const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "15m" });
                return newUser;
            }));
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
                    user_id: referrer.id
                },
                data: {
                    points: referrerPoint.points
                }
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
                    code: CodeGenerator()
                }
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
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
            };
            const token = (0, jsonwebtoken_1.sign)(payload, String(config_1.SECRET_KEY), { expiresIn: "1h" });
            return { user: payload, token };
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
