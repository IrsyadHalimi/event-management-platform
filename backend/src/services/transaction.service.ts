import prisma from "../config/prisma";

import {
  findEventByIdTransactionRepo,
  createTransactionRepo,
  reduceSeatRepo,
  findUserTransactionsRepo
} from "../repositories/transaction.repository";

export const createTransactionService =
  async (
    payload: any,
    userId: string
  ) => {
    const event =
      await findEventByIdTransactionRepo(
        payload.eventId
      );

    if (!event) {
      throw new Error(
        "Event not found"
      );
    }

    if (
      event.availableSeats <
      payload.quantity
    ) {
      throw new Error(
        "Insufficient seats"
      );
    }

    const total =
      event.price *
      payload.quantity;

    const expiredAt =
      new Date(
        Date.now() +
          2 * 60 * 60 * 1000
      );

    return prisma.$transaction(
      async (tx) => {
        const transaction =
          await createTransactionRepo(
            tx,
            {
              userId,

              eventId:
                payload.eventId,

              quantity:
                payload.quantity,

              total,

              status:
                "WAITING_FOR_PAYMENT",

              expiredAt
            }
          );

        await reduceSeatRepo(
          tx,
          payload.eventId,
          payload.quantity
        );

        return transaction;
      }
    );
  };

export const getMyTransactionsService =
  async (
    userId: string
  ) => {
    return findUserTransactionsRepo(
      userId
    );
  };