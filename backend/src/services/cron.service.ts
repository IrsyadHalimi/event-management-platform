import prisma from "../config/prisma";

import {
  findExpiredTransactionsRepo,
  findWaitingAdminTransactionsRepo,
  restoreSeatRepo,
  updateTransactionRepo
} from "../repositories/transaction.repository";

export const expiredTransactionJob =
  async () => {
    const transactions =
      await findExpiredTransactionsRepo();

    for (const transaction of transactions) {
      await prisma.$transaction(
        async (tx) => {
          await restoreSeatRepo(
            tx,
            transaction.eventId,
            transaction.quantity
          );

          await updateTransactionRepo(
            tx,
            transaction.id,
            {
              status:
                "EXPIRED"
            }
          );
        }
      );

      console.log(
        `Transaction expired: ${transaction.id}`
      );
    }
  };

export const canceledTransactionJob =
  async () => {
    const transactions =
      await findWaitingAdminTransactionsRepo();

    for (const transaction of transactions) {
      await prisma.$transaction(
        async (tx) => {
          await restoreSeatRepo(
            tx,
            transaction.eventId,
            transaction.quantity
          );

          await updateTransactionRepo(
            tx,
            transaction.id,
            {
              status:
                "CANCELED"
            }
          );
        }
      );

      console.log(
        `Transaction canceled: ${transaction.id}`
      );
    }
  };