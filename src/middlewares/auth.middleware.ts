import { Request, Response, NextFunction } from "express";
import { IUserReqParam } from "../custom";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export async function VerifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) throw new Error("Unauthorized");

        const verifyUser = verify(token, String(SECRET_KEY));

        if (!verifyUser) throw new Error("Invalid Token");

        req.data = verifyUser as IUserReqParam;

        next();
    } catch (err) {
        next(err);
    }
}

export async function EOGuard(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.data?.user.role !== "organizer") throw new Error("Restricted");

        next();
    } catch (err) {
        next(err);
    }
}