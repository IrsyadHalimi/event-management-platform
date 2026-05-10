import { api }
  from "../lib/axios";

interface Params {
  page?: number;

  limit?: number;

  search?: string;

  category?: string;

  location?: string;
}

export const getEventsService =
  async (
    params: Params
  ) => {
    const response =
      await api.get(
        "/events",
        {
          params
        }
      );

    return response.data;
  };

export const getEventDetailService =
  async (
    slug: string
  ) => {
    const response =
      await api.get(
        `/events/${slug}`
      );

    return response.data;
  };

export const updateEventService =
  async (
    id: string,
    payload: FormData
  ) => {
    const response =
      await api.patch(
        `/events/${id}`,
        payload,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };