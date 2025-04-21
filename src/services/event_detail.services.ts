import prisma from "../lib/prisma";

export async function GetEventDetailByIdSevice(params: string) {
    try {
        const event = await prisma.events.findUnique({
            where: {
                id: Number(params), // ganti dengan ID yang kamu cari
            },
        });
        if (!event) throw new Error(`Event with id ${params} not found`)

        return event
    } catch (err) {
        throw err;
    }
}