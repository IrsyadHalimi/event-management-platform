import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "../interfaces/request.interface";

import {
  createTransactionSchema
} from "../validators/transaction.validator";

import {
  createTransactionService,
  getMyTransactionsService
} from "../services/transaction.service";

export const createTransaction =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedData =
        createTransactionSchema.parse(
          req.body
        );

      const transaction =
        await createTransactionService(
          validatedData,
          req.user!.id
        );

      return res
        .status(201)
        .json({
          success: true,
          message:
            "Transaction created",
          data:
            transaction
        });
    } catch (error) {
      next(error);
    }
  };

export const getMyTransactions =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactions =
        await getMyTransactionsService(
          req.user!.id
        );

      return res.json({
        success: true,
        data:
          transactions,

        isEmpty:
          transactions.length ===
          0
      });
    } catch (error) {
      next(error);
    }
  };