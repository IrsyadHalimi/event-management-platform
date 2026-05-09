import {
  createEventRepo,
  findEventsRepo,
  findEventBySlugRepo
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