import { NextFunction, Request, Response } from "express";
import { GetVoucherByEventIdServices, GetVoucherByUserIdServices } from "../services/voucher.service";

export async function GetVoucherByEventIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const voucher = await GetVoucherByEventIdServices(eventId);

        res.status(200).send({
            success: true,
            message: `Get voucher with id ${eventId} is success`,
            data: voucher
        })
    } catch (err) {
        next(err)
    }
}

export async function GetVoucherByUserIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req?.params?.id
        const voucher = await GetVoucherByUserIdServices(userId);

        res.status(200).send({
            success: true,
            message: `Get voucher with user id ${userId} is success`,
            data: voucher
        })
    } catch (err) {
        next(err)
    }
}