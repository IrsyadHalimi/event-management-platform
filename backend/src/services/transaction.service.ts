import prisma from "../config/prisma";

import {
  findEventByIdTransactionRepo,
  createTransactionRepo,
  reduceSeatRepo,
  restoreSeatRepo,
  findUserTransactionsRepo,
  findTransactionByIdRepo,
  updateTransactionRepo,
  findOrganizerTransactionsRepo,
  organizerStatisticsRepo,
  monthlyRevenueRepo, 
  dailyRevenueRepo
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

export const uploadPaymentProofService =
  async (
    transactionId: string,
    paymentProof: string,
    userId: string
  ) => {
    const transaction =
      await findTransactionByIdRepo(
        transactionId
      );

    if (!transaction) {
      throw new Error(
        "Transaction not found"
      );
    }

    if (
      transaction.userId !==
      userId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    if (
      transaction.status !==
      "WAITING_FOR_PAYMENT"
    ) {
      throw new Error(
        "Invalid transaction status"
      );
    }

    return prisma.$transaction(
      async (tx) => {
        return updateTransactionRepo(
          tx,
          transactionId,
          {
            paymentProof,

            status:
              "WAITING_FOR_ADMIN_CONFIRMATION"
          }
        );
      }
    );
  };

export const acceptTransactionService =
  async (
    transactionId: string,
    organizerId: string
  ) => {
    const transaction =
      await findTransactionByIdRepo(
        transactionId
      );

    if (!transaction) {
      throw new Error(
        "Transaction not found"
      );
    }

    if (
      transaction.event
        .organizerId !==
      organizerId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    return prisma.$transaction(
      async (tx) => {
        return updateTransactionRepo(
          tx,
          transactionId,
          {
            status: "DONE"
          }
        );
      }
    );
  };

export const rejectTransactionService =
  async (
    transactionId: string,
    organizerId: string
  ) => {
    const transaction =
      await findTransactionByIdRepo(
        transactionId
      );

    if (!transaction) {
      throw new Error(
        "Transaction not found"
      );
    }

    if (
      transaction.event
        .organizerId !==
      organizerId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    return prisma.$transaction(
      async (tx) => {
        await restoreSeatRepo(
          tx,
          transaction.eventId,
          transaction.quantity
        );

        return updateTransactionRepo(
          tx,
          transactionId,
          {
            status:
              "REJECTED"
          }
        );
      }
    );
  };

export const cancelTransactionService =
  async (
    transactionId: string,
    userId: string
  ) => {
    const transaction =
      await findTransactionByIdRepo(
        transactionId
      );

    if (!transaction) {
      throw new Error(
        "Transaction not found"
      );
    }

    if (
      transaction.status !==
      "WAITING_FOR_PAYMENT"
    ) {
      throw new Error(
        "Transaction cannot be canceled"
      );
    }

    if (
      transaction.userId !==
      userId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    return prisma.$transaction(
      async (tx) => {
        await restoreSeatRepo(
          tx,
          transaction.eventId,
          transaction.quantity
        );

        return updateTransactionRepo(
          tx,
          transactionId,
          {
            status:
              "CANCELED"
          }
        );
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

export const getOrganizerTransactionsService =
  async (
    organizerId: string
  ) => {
    return findOrganizerTransactionsRepo(
      organizerId
    );
  };

export const getOrganizerStatisticsService =
  async (
    organizerId: string
  ) => {
    return organizerStatisticsRepo(
      organizerId
    );
  };

export const getMonthlyRevenueService =
  async (
    organizerId: string
  ) => {
    return monthlyRevenueRepo(
      organizerId
    );
  };

export const getDailyRevenueService =
  async (
    organizerId: string
  ) => {
    return dailyRevenueRepo(
      organizerId
    );
  };