import prisma from "../lib/prisma";

export async function GetAllEventService() {
    try {
        const events = await prisma.events.findMany();
        if (!events) throw new Error('Events not found')
        return events
    } catch (err) {
        throw err;
    }
}

