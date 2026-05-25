import {
  createEventRepo,
  findEventsRepo,
  findEventBySlugRepo,
  findEventByIdRepo,
  updateEventRepo,
  deleteEventRepo,
  findOrganizerEventsRepo,
  getHeroEvents
} from "../repositories/event.repository";

import { generateSlug }
  from "../utils/slug";

export const createEventService =
  async (
    payload: any,
    organizerId: string
  ) => {
    const slug =
      generateSlug(
        payload.title
      );

    return createEventRepo({
      ...payload,

      slug,

      organizerId,

      startDate:
        new Date(
          payload.startDate
        ),

      endDate:
        new Date(
          payload.endDate
        )
    });
  };

export const findEventsService =
  async (query: any) => {
    const page =
      Number(query.page) || 1;

    const limit =
      Number(query.limit) || 10;

    return findEventsRepo({
      search: query.search,

      category:
        query.category,

      location:
        query.location,

      page,

      limit
    });
  };

export const findEventBySlugService =
  async (slug: string) => {
    return findEventBySlugRepo(
      slug
    );
  };

export const updateEventService =
  async (
    id: string,
    payload: any,
    organizerId: string
  ) => {
    const event =
      await findEventByIdRepo(id);

    if (!event) {
      throw new Error(
        "Event not found"
      );
    }

    if (
      event.organizerId !==
      organizerId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    let slug;

    if (payload.title) {
      slug = generateSlug(
        payload.title
      );
    }

    return updateEventRepo(id, {
      ...payload,

      slug,

      startDate:
        payload.startDate
          ? new Date(
              payload.startDate
            )
          : undefined,

      endDate:
        payload.endDate
          ? new Date(
              payload.endDate
            )
          : undefined
    });
  };

export const deleteEventService =
  async (
    id: string,
    organizerId: string
  ) => {
    const event =
      await findEventByIdRepo(id);

    if (!event) {
      throw new Error(
        "Event not found"
      );
    }

    if (
      event.organizerId !==
      organizerId
    ) {
      throw new Error(
        "Forbidden"
      );
    }

    return deleteEventRepo(id);
  };

export const findOrganizerEventsService =
  async (
    organizerId: string
  ) => {
    return findOrganizerEventsRepo(
      organizerId
    );
  };

export const getHeroEventsService =
  async () => {
    return getHeroEvents();
  };