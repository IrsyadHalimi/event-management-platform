import { Router } from "express";

import {
  createEvent,
  getEvents,
  getEventDetail
} from "../controllers/event.controller";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  roleMiddleware
} from "../middleware/role.middleware";

const router = Router();

router.get("/", getEvents);

router.get(
  "/:slug",
  getEventDetail
);

router.post(
  "/",
  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  createEvent
);

export default router;