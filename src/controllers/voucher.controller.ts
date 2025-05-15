import { NextFunction, Request, Response } from "express";
import { CreateVoucherService, DeleteVoucherByIdService, EditVoucherByIdService, GetAllVoucherByOrganizerIdService, GetVoucherByEventIdServices, GetVoucherByUserIdServices } from "../services/voucher.service";

export async function GetVoucherByEventIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const eventId = req?.params?.id

    const voucher = await GetVoucherByEventIdServices(eventId);

    res.status(200).send({
      success: true,
      message: `Get voucher with id ${eventId} is success`,
      data: voucher
    })
  } catch (err) {
    next(err)
  }
}

export async function GetVoucherByUserIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req?.params?.id
    const voucher = await GetVoucherByUserIdServices(userId);

    res.status(200).send({
      success: true,
      message: `Get voucher with user id ${userId} is success`,
      data: voucher
    })
  } catch (err) {
    next(err);
  }
}

export async function CreateVoucherController(req: Request, res: Response, next: NextFunction) {
  try {
    const voucher = await CreateVoucherService(req.body);

    res.status(200).send({
      success: true,
      message: `create new voucher for event id ${req.body.event_id} is success`,
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
}

export async function EditVoucherByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    const voucher = await EditVoucherByIdService(id, req.body);

    res.status(200).send({
      success: true,
      message: `Update voucher with id ${req.body.event_id} is success`,
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
}

export async function DeleteVoucherByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    await DeleteVoucherByIdService(id);

    res.status(200).send({
      success: true,
      message: `Delete voucher with id ${req.body.event_id} is success`,
    });
  } catch (err) {
    next(err);
  }
}

export async function GetAllVoucherByOrganizerIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req?.params?.id)
    const vouchers = await GetAllVoucherByOrganizerIdService(id)

    res.status(200).send({
      success: true,
      message: `Get voucher is success`,
      data: vouchers
    })

  } catch (error) {
    next(error)
  }
}