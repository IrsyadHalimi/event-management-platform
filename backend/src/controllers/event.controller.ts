import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "../interfaces/request.interface";

import {
  createEventSchema
} from "../validators/event.validator";

import {
  createEventService,
  findEventsService,
  findEventBySlugService
} from "../services/event.service";
import { generateSlug } from "../utils/slug";

export const createEvent =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validatedData =
        createEventSchema.parse(
          req.body
        );

      const event =
        await createEventService(
          validatedData,
          req.user!.id
        );

      return res
        .status(201)
        .json({
          success: true,
          message:
            "Event created",
          data: event
        });
    } catch (error) {
      next(error);
    }
  };

export const getEvents =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const events =
        await findEventsService(
          req.query
        );

      return res.json({
        success: true,
        data: events
      });
    } catch (error) {
      next(error);
    }
  };

export const getEventDetail =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const slug = req.params.slug; 

      const event =
        await findEventBySlugService(
          slug as string
        );

      return res.json({
        success: true,
        data: event
      });
    } catch (error) {
      next(error);
    }
  };