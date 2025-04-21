import { NextFunction, Request, Response } from "express";
import { GetAllCategoriesService } from "../services/categories.service";

export async function GetAllCategoriesController(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await GetAllCategoriesService();

        res.status(200).send({
            message: 'Success',
            data: categories
        })
    } catch (err) {
        next(err)
    }
}