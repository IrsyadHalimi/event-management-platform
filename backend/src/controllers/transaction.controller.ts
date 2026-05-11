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
  uploadPaymentProofService,
  acceptTransactionService,
  rejectTransactionService,
  cancelTransactionService,
  getMyTransactionsService,
  getOrganizerTransactionsService,
  getOrganizerStatisticsService,
  getMonthlyRevenueService,
  getDailyRevenueService
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

export const uploadPaymentProof =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.file) {
        throw new Error(
          "Payment proof required"
        );
      }

      const transaction =
        await uploadPaymentProofService(
          req.params.id as string,

          req.file.filename,

          req.user!.id
        );

      return res.json({
        success: true,
        message:
          "Payment proof uploaded",

        data:
          transaction
      });
    } catch (error) {
      next(error);
    }
  };

export const acceptTransaction =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transaction =
        await acceptTransactionService(
          req.params.id as string,
          req.user!.id
        );

      return res.json({
        success: true,
        message:
          "Transaction accepted",

        data:
          transaction
      });
    } catch (error) {
      next(error);
    }
  };

export const rejectTransaction =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transaction =
        await rejectTransactionService(
          req.params.id as string,
          req.user!.id
        );

      return res.json({
        success: true,
        message:
          "Transaction rejected",

        data:
          transaction
      });
    } catch (error) {
      next(error);
    }
  };

export const cancelTransaction =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transaction =
        await cancelTransactionService(
          req.params.id as string,
          req.user!.id
        );

      return res.json({
        success: true,
        message:
          "Transaction canceled",

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

export const getOrganizerTransactions =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const transactions =
        await getOrganizerTransactionsService(
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

export const getOrganizerStatistics =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const statistics =
        await getOrganizerStatisticsService(
          req.user!.id
        );

      return res.json({
        success: true,
        data:
          statistics
      });
    } catch (error) {
      next(error);
    }
  };

export const getMonthlyRevenue =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const revenue =
        await getMonthlyRevenueService(
          req.user!.id
        );

      return res.json({
        success: true,
        data: revenue
      });
    } catch (error) {
      next(error);
    }
  };

export const getDailyRevenue =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const revenue =
        await getDailyRevenueService(
          req.user!.id
        );

      return res.json({
        success: true,
        data: revenue
      });
    } catch (error) {
      next(error);
    }
  };
  