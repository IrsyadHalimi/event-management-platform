import prisma from "../config/prisma";

export const findEventByIdTransactionRepo =
  async (eventId: string) => {
    return prisma.event.findUnique({
      where: {
        id: eventId
      }
    });
  };

export const createTransactionRepo =
  async (tx: any, data: any) => {
    return tx.transaction.create({
      data
    });
  };

export const reduceSeatRepo =
  async (
    tx: any,
    eventId: string,
    quantity: number
  ) => {
    return tx.event.update({
      where: {
        id: eventId
      },

      data: {
        availableSeats: {
          decrement:
            quantity
        }
      }
    });
  };

export const restoreSeatRepo =
  async (
    tx: any,
    eventId: string,
    quantity: number
  ) => {
    return tx.event.update({
      where: {
        id: eventId
      },

      data: {
        availableSeats: {
          increment:
            quantity
        }
      }
    });
  };

export const findUserTransactionsRepo =
  async (userId: string) => {
    return prisma.transaction.findMany({
      where: {
        userId
      },

      include: {
        event: true
      },

      orderBy: {
        createdAt: "desc"
      }
    });
  };

export const findTransactionByIdRepo =
  async (id: string) => {
    return prisma.transaction.findUnique({
      where: {
        id
      },

      include: {
        event: true
      }
    });
  };

export const updateTransactionRepo =
  async (
    tx: any,
    id: string,
    data: any
  ) => {
    return tx.transaction.update({
      where: {
        id
      },

      data
    });
  };