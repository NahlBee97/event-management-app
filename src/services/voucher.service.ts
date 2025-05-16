import { IBodyEventVoucher } from "../interfaces/voucher.interface";
import prisma from "../lib/prisma";

export async function GetVoucherByEventIdServices(params: string) {
  try {
    const voucher = await prisma?.event_vouchers.findFirst({
      where: {
        event_id: Number(params),
      },
    });

    if (!voucher) throw new Error("Voucher not found");

    return voucher;
  } catch (err) {
    throw err;
  }
}

export async function GetVoucherByUserIdServices(params: string) {
  try {
    const voucher = await prisma?.user_vouchers.findFirst({
      where: {
        user_id: Number(params),
      },
    });

    if (!voucher) throw new Error("Voucher not found");

    return voucher;
  } catch (err) {
    throw err;
  }
}

export async function CreateVoucherService(params: IBodyEventVoucher) {
  try {
    const {
      name,
      event_id,
      description,
      tnc_description,
      discount_percentage,
      start_date,
      expired_date,
      code,
      max_usage,
      current_usage,
    } = params;

    const voucher = await prisma.event_vouchers.create({
      data: {
        name: name,
        event_id: event_id,
        description: description,
        tnc_description: tnc_description,
        discount_percentage: discount_percentage,
        start_date: start_date,
        expired_date: expired_date,
        code: code,
        max_usage: max_usage,
        current_usage: current_usage,
      },
    });

    return voucher;
  } catch (err) {
    throw err;
  }
}

export async function EditVoucherByIdService(id: number, body: IBodyEventVoucher) {
  try {
    const {
      name,
      event_id,
      description,
      tnc_description,
      discount_percentage,
      start_date,
      expired_date,
      code,
      max_usage,
      current_usage,
    } = body;

    const voucher = await prisma.event_vouchers.findFirst({
      where: {
        id
      }
    })

    if (!voucher) throw new Error("Voucher not found");

    const updateVoucher = await prisma.event_vouchers.update({
      where: {
        id,
      },
      data: {
        name: name || voucher.name,
        event_id: event_id || voucher.event_id,
        description: description || voucher.description,
        tnc_description: tnc_description || voucher.tnc_description,
        discount_percentage: discount_percentage || voucher.discount_percentage,
        start_date: start_date || voucher.start_date,
        expired_date: expired_date || voucher.expired_date,
        code: code || voucher.code,
        max_usage: max_usage || voucher.max_usage,
        current_usage: current_usage || voucher.current_usage,
      },
    });

    return voucher;
  } catch (err) {
    throw err;
  }
}

export async function DeleteVoucherByIdService(
  id: number
) {
  try {
    const voucher = await prisma.event_vouchers.findFirst({
      where: {
        id,
      },
    });

    if (!voucher) throw new Error("Voucher not found");

    await prisma.event_vouchers.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function GetAllVoucherByOrganizerIdService(organizerId: number) {
  try {
    const vouchers = await prisma.event_vouchers.findMany({
      where: {
        events: {
          organizer_id: organizerId,
        },
      },
      include: {
        events: {
          select: {
            id: true,
            name: true,
            start_date: true,
            end_date: true,
            organizer_id: true,
            users: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });
    if (!vouchers) throw new Error("Voucher not found");
    return vouchers
  } catch (error) {
    throw error;
  }
}