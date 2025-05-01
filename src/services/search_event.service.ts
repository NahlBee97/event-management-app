import { ISearchEvent } from "../interfaces/event.interface";
import prisma from "../lib/prisma";

export async function SearchEventService(params: ISearchEvent) {
    try {
        const { category, start_date, end_date, min_price, max_price } = params
        const filters: any = {};

        if (category) {
            filters.event_category = {
                category: category as string,
            };
        }

        if (start_date) {
            filters.start_date = {
                gte: new Date(start_date), // format ISO seperti yang kamu kasih
            };
        }

        if (end_date) {
            filters.end_date = {
                lte: new Date(end_date),
            };
        }

        if (min_price || max_price) {
            filters.price = {
                ...(min_price && { gte: parseFloat(min_price as string) }),
                ...(max_price && { lte: parseFloat(max_price as string) }),
            };
        }

        const events = await prisma.events.findMany({
            where: {
                ...filters,
            },
            include: {
                event_category: true,
            },
        });

        if (!events) throw new Error(`Event not found`)

        return events
    } catch (error) {
        throw error
    }
}