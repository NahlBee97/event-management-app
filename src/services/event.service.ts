import { IBodyEvent } from "../interfaces/event.interface";
import prisma from "../lib/prisma";

const Datevalidator = (start_date: Date, end_date: Date) => {
  const now = new Date();
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const isSameDay = startDate.toDateString() === endDate.toDateString();

  if (isSameDay && startDate.getTime() >= endDate.getTime()) {
    throw new Error(
      "Start time must be earlier than end time. Suggestions edit event for tomorrow"
    );
  }

  if (end_date < start_date) {
    throw new Error("Start date must be at least before endDate.");
  }

  if (endDate.getTime() < startDate.getTime()) {
    throw new Error("End date cannot be earlier than start date.");
  }

}

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
      path,
      organizer_id,
    } = bodyData;

    const newEvent = await prisma.events.create({
      data: {
        name,
        description,
        category_id,
        start_date,
        end_date,
        total_seats,
        remaining_seats,
        price,
        location: 'Online',
        path,
        organizer_id,
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
    return newEvent;
  } catch (err) {
    throw err;
  }
}

export async function EditEventByIdService(eventId: number, bodyData: IBodyEvent) {
  try {
    const { name, description, category_id, start_date, end_date, total_seats, remaining_seats, price, path } = bodyData;
    const event = await prisma.events.findFirst({
      where: {
        id: eventId
      }
    });

    if (!event) throw new Error("This event does not exist");

    Datevalidator(start_date, end_date)

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
        price: price || event.price,
        path: path || event.path
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