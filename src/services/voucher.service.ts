import prisma from "../lib/prisma";

export async function GetVoucherByEventIdServices(params: string) {
    try {
        const voucher = await prisma.vouchers.findFirst({
            where: {
                event_id: Number(params)
            },
        })

        if (!voucher) throw new Error('Voucher not found')

        return voucher
    } catch (err) {
        throw err;
    }
}
