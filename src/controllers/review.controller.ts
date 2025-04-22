import { NextFunction, Request, Response } from "express";
import { CreateReviewService, GetReviewByEventIdSevice, GetReviewByUserIdservice } from "../services/review.service";

export async function GetReviewByEventIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const review = await GetReviewByEventIdSevice(eventId);

        res.status(200).send({
            success: true,
            message: `Get review with id ${eventId} is success`,
            data: review
        })
    } catch (err) {
        next(err)
    }
}

export async function GetReviewByUserIdController(req: Request, res: Response, next: NextFunction) {
    try {
        const eventId = req?.params?.id

        const review = await GetReviewByUserIdservice(eventId);

        res.status(200).send({
            success: true,
            message: `Get review with user id ${eventId} is success`,
            data: review
        })
    } catch (err) {
        next(err)
    }
}

export async function CreateReviewController(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await CreateReviewService(req.body)

        res.status(200).send({
            success: true,
            message: `Your review have been adding`,
            data
        })
    } catch (err) {
        next(err)
    }
}