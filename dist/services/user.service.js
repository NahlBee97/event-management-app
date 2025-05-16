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
exports.FindUserById = FindUserById;
exports.GetAllUserService = GetAllUserService;
exports.FindUserByIdService = FindUserByIdService;
exports.EditUserByIdService = EditUserByIdService;
exports.UpdateUserService = UpdateUserService;
exports.DeleteUserByIdService = DeleteUserByIdService;
const prisma_1 = __importDefault(require("../lib/prisma"));
const cloudinary_1 = require("../utils/cloudinary");
const auth_service_1 = require("./auth.service");
function FindUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma_1.default.users.findFirst({
                where: {
                    id: userId,
                },
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
//edit user by id function
function EditUserById(userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existedUser = yield FindUserById(userId);
            const { first_name, last_name, email, password, role, profile_picture, } = body;
            const editedUser = yield prisma_1.default.users.update({
                where: { id: userId },
                data: {
                    first_name: first_name || (existedUser === null || existedUser === void 0 ? void 0 : existedUser.first_name),
                    last_name: last_name || (existedUser === null || existedUser === void 0 ? void 0 : existedUser.last_name),
                    email: email || (existedUser === null || existedUser === void 0 ? void 0 : existedUser.email),
                    password: password || (existedUser === null || existedUser === void 0 ? void 0 : existedUser.password),
                    role: role || (existedUser === null || existedUser === void 0 ? void 0 : existedUser.role),
                    profile_picture: profile_picture || (existedUser === null || existedUser === void 0 ? void 0 : existedUser.profile_picture),
                },
            });
            return editedUser;
        }
        catch (err) {
            throw err;
        }
    });
}
function DeleteUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Delete related data from the referral_logs table where the user_id is the user
            yield prisma_1.default.referral_logs.deleteMany({
                where: {
                    user_id: userId,
                },
            });
            // Delete related data from the coupons table
            yield prisma_1.default.coupons.deleteMany({
                where: {
                    user_id: userId,
                },
            });
            // Delete related data from the points table
            yield prisma_1.default.points.deleteMany({
                where: {
                    user_id: userId,
                },
            });
            // Delete related data from the review table
            yield prisma_1.default.reviews.deleteMany({
                where: {
                    user_id: userId,
                },
            });
            // Delete related data from the transactions table
            yield prisma_1.default.transactions.deleteMany({
                where: {
                    user_id: userId,
                },
            });
            // Delete related data from the events table
            yield prisma_1.default.events.deleteMany({
                where: {
                    organizer_id: userId,
                },
            });
            // Delete related data from the user_vouchers table
            yield prisma_1.default.user_vouchers.deleteMany({
                where: {
                    user_id: userId,
                },
            });
            // Finally, delete the user record
            yield prisma_1.default.users.delete({
                where: {
                    id: userId,
                },
            });
        }
        catch (err) {
            throw err;
        }
    });
}
function GetAllUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma_1.default.users.findMany();
        if (!users)
            throw new Error("No Users Yet");
        return users;
    });
}
// Find user by id service
function FindUserByIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield FindUserById(userId);
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
//edit user by id service
function EditUserByIdService(userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editedUser = yield EditUserById(userId, body);
            return editedUser;
        }
        catch (err) {
            throw err;
        }
    });
}
function UpdateUserService(file, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = "";
        try {
            const checkUser = yield (0, auth_service_1.FindUserByEmail)(email);
            if (!checkUser)
                throw new Error("User not found");
            yield prisma_1.default.$transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(file);
                url = secure_url;
                const splitUrl = secure_url.split("/");
                const fileName = splitUrl[splitUrl.length - 1];
                yield t.users.update({
                    where: {
                        id: checkUser.id
                    },
                    data: {
                        profile_picture: fileName
                    }
                });
            }));
        }
        catch (err) {
            yield (0, cloudinary_1.cloudinaryRemove)(url);
            throw err;
        }
    });
}
function DeleteUserByIdService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DeleteUserById(userId);
        }
        catch (err) {
            throw err;
        }
    });
}
