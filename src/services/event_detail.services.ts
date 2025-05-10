import prisma from "../lib/prisma";

export async function GetEventDetailByIdSevice(params: string) {
    try {
        const event = await prisma.events.findUnique({
            where: {
                id: Number(params)
            },
            include: {
                event_category: true,
                users: {
                    select: {
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        if (!event) throw new Error(`Event with id ${params} not found`)

        return event
    } catch (err) {
        throw err;
    }
}