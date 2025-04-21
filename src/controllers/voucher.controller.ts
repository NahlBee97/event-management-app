import { NextFunction, Request, Response } from "express";
import { GetVoucherByEventIdServices } from "../services/voucher.service";

export async function GetVoucherByEventIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const event = await GetVoucherByEventIdServices(eventId);

        res.status(200).send({
            success: true,
            message: `Get voucher with id ${eventId} is success`,
            data: event
        })
    } catch (err) {
        next(err)
    }
}