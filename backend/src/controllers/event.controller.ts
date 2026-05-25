import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "../interfaces/request.interface";

import {
  createEventSchema,
  updateEventSchema
} from "../validators/event.validator";

import {
  createEventService,
  findEventsService,
  findEventBySlugService,
  updateEventService,
  deleteEventService,
  findOrganizerEventsService,
  getHeroEventsService
} from "../services/event.service";

import { deleteFile } from "../utils/file";

export const createEvent =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = createEventSchema.safeParse(req.body);

      if (!result.success) {
        deleteFile(req.file?.path);
        
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: result.error.errors
        });
      }

      const validatedData =
        createEventSchema.parse(
          req.body
        );

      let thumbnailName = "";
      if (req.file) {
        thumbnailName = req.file?.filename;
      }

      const eventData = {
        ...validatedData,
        thumbnail: thumbnailName,
      };

      const event =
        await createEventService(
          eventData,
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
        data: events,

        isEmpty:
          events.length === 0
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

export const updateEvent =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = updateEventSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: result.error.errors
        });
      }
      
      const validatedData =
        updateEventSchema.parse(
          req.body
        );

      const event =
        await updateEventService(
          req.params.id as string,
          validatedData,
          req.user!.id
        );

      return res.json({
        success: true,
        message:
          "Event updated",
        data: event
      });
    } catch (error) {
      next(error);
    }
  };

export const deleteEvent =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await deleteEventService(
        req.params.id as string,
        req.user!.id
      );

      return res.json({
        success: true,
        message:
          "Event deleted"
      });
    } catch (error) {
      next(error);
    }
  };

export const getOrganizerEvents =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const events =
        await findOrganizerEventsService(
          req.user!.id
        );

      return res.json({
        success: true,
        data: events,

        isEmpty:
          events.length === 0
      });
    } catch (error) {
      next(error);
    }
  };

export const getHeroEvents =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const events =
        await getHeroEventsService();

      return res.json({
        success: true,
        data: events
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Failed to get hero events"
      });
    }
  };