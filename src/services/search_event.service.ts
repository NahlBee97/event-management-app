import { ISearchEvent } from "../interfaces/event.interface";
import prisma from "../lib/prisma";

function toLocalISOString(date: Date, timeZone: string): string {
    const localString = date.toLocaleString("sv-SE", {
        timeZone,
        hour12: false,
    });
    return localString.replace(" ", "T") + ".000";
}

export async function SearchEventService(params: ISearchEvent) {
    try {
        const { category_id, start_date, end_date, min_price, max_price, organizer_id } = params
        const filters: any = {};
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        if (category_id) {
            filters.category_id = Number(category_id);
        }

        if (start_date) {
            const localStartDate = new Date(start_date);
            filters.start_date = { gte: new Date(toLocalISOString(localStartDate, userTimeZone)) };
        }

        if (end_date) {
            const localEndDate = new Date(end_date);
            filters.end_date = { lte: new Date(toLocalISOString(localEndDate, userTimeZone)) };
        }

        if (min_price || max_price) {
            filters.price = {
                ...(min_price && { gte: parseFloat(min_price as string) }),
                ...(max_price && { lte: parseFloat(max_price as string) }),
            };
        }

        if (organizer_id) {
            filters.organizer_id = Number(organizer_id);
        }

        const events = await prisma.events.findMany({
            where: {
                ...filters
            },
            include: {
                event_category: true,
            },
        });

        if (!events) throw new Error(`Event not found`)

        const eventsWithLocalTime = events.map(event => {
            return {
                ...event,
                start_date: toLocalISOString(new Date(event.start_date), userTimeZone),
                end_date: toLocalISOString(new Date(event.end_date), userTimeZone),
            };
        });

        return eventsWithLocalTime
    } catch (error) {
        throw error
    }
}