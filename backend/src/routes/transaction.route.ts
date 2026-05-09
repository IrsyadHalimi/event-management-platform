import { Router } from "express";

import {
  createTransaction,
  uploadPaymentProof,
  acceptTransaction,
  rejectTransaction,
  getMyTransactions
} from "../controllers/transaction.controller";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  roleMiddleware
} from "../middleware/role.middleware";

import { upload }
  from "../config/multer";

const router = Router();

router.post(
  "/",
  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  createTransaction
);

router.post(
  "/:id/upload-proof",

  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  upload.single(
    "paymentProof"
  ),

  uploadPaymentProof
);

router.patch(
  "/:id/accept",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  acceptTransaction
);

router.patch(
  "/:id/reject",

  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  rejectTransaction
);

router.get(
  "/my-transactions",

  authMiddleware,

  roleMiddleware([
    "CUSTOMER"
  ]),

  getMyTransactions
);

export default router;