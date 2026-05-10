import { Router } from "express";

import {
  createEvent,
  getEvents,
  getEventDetail,
  updateEvent,
  deleteEvent,
  getOrganizerEvents
} from "../controllers/event.controller";

import {
  authMiddleware
} from "../middleware/auth.middleware";

import {
  roleMiddleware
} from "../middleware/role.middleware";

import { upload } from "../config/multer";

const router = Router();

router.get("/", getEvents);

router.get(
  "/my-events",
  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  getOrganizerEvents
);

router.get(
  "/:slug",
  getEventDetail
);

router.post(
  "/",
  authMiddleware,
  
  upload.single("thumbnail"),

  roleMiddleware([
    "ORGANIZER"
  ]),

  createEvent
);

router.put(
  "/:id",
  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  deleteEvent
);

export default router;