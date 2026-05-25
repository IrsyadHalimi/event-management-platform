import { Router } from "express";

import {
  createEvent,
  getEvents,
  getEventDetail,
  updateEvent,
  deleteEvent,
  getOrganizerEvents,
  getHeroEvents
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
  "/hero/latest",
  getHeroEvents
);

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

router.patch(
  "/:id",
  authMiddleware,

  roleMiddleware([
    "ORGANIZER"
  ]),

  upload.none(),

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