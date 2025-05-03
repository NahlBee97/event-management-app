import prisma from "../lib/prisma";

export async function GetEventDetailByIdService(params: string) {
    try {
        const event = await prisma.events.findUnique({
            where: {
                id: Number(params), // ganti dengan ID yang kamu cari
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