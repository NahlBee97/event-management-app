import { IBodyEvent } from "../interfaces/event.interface";
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

export async function CreateEventService(
  bodyData: IBodyEvent
) {
  try {
    const {
      name,
      description,
      category_id,
      start_date,
      end_date,
      total_seats,
      remaining_seats,
      price,
    } = bodyData;

    const newEvent = await prisma.events.create({
      data: {
        name: name,
        description: description,
        category_id: category_id,
        start_date: start_date,
        end_date: end_date,
        total_seats: total_seats,
        remaining_seats: remaining_seats,
        price: price,
      },
    });
    return newEvent;
  } catch (err) {
    throw err;
  }
}

export async function EditEventByIdService(eventId: number, bodyData: IBodyEvent) {
  try {
    const { name, description, category_id, start_date, end_date, total_seats, remaining_seats, price } = bodyData;

    const event = await prisma.events.findFirst({
      where: {
        id: eventId
      }
    });

    if (!event) throw new Error("This event does not exist");

    const updatedEvent = await prisma.events.update({
      where: {
        id: eventId
      },
      data: {
        name: name || event.name,
        description: description || event.description,
        category_id: category_id || event.category_id,
        start_date: start_date || event.start_date,
        end_date: end_date || event.end_date,
        total_seats: total_seats || event.total_seats,
        remaining_seats: remaining_seats || event.remaining_seats,
        price: price || event.price
      }
    });
    return updatedEvent;
  } catch (err) {
    throw err;
  }
}

export async function DeleteEventByIdService(
  eventId: number
) {
  try {
    //delete voucher
    const eventVoucher = await prisma.event_vouchers.findFirst({
      where: {
        event_id: eventId
      }
    })

    if (eventVoucher) {
      await prisma.event_vouchers.deleteMany({
        where: {
          event_id: eventId
        }
      })
    }
    //delete riview
    const eventReview = await prisma.reviews.findFirst({
      where: {
        event_id: eventId,
      },
    });

    if (eventReview) {
      await prisma.reviews.deleteMany({
        where: {
          event_id: eventId,
        },
      });
    }
    //delete transaction
    const eventTransaction = await prisma.transactions.findFirst({
      where: {
        event_id: eventId,
      },
    });

    if (eventTransaction) {
      await prisma.transactions.deleteMany({
        where: {
          event_id: eventId,
        },
      });
    }
    //delete event
    await prisma.events.delete({
      where: {
        id: eventId,
      },
    });
  } catch (err) {
    throw err;
  }
}