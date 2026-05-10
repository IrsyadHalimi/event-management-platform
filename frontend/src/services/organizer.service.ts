import { api }
  from "../lib/axios";

export const getMyEventsService =
  async () => {
    const response =
      await api.get(
        "/events/my-events"
      );

    return response.data;
  };

export const createEventService =
  async (
    formData: FormData
  ) => {
    const response =
      await api.post(
        "/events",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export const updateEventService =
  async (
    id: string,
    formData: FormData
  ) => {
    const response =
      await api.patch(
        `/events/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    return response.data;
  };

export const deleteEventService =
  async (
    id: string
  ) => {
    const response =
      await api.delete(
        `/events/${id}`
      );

    return response.data;
  };

export const getOrganizerTransactionsService =
  async () => {
    const response =
      await api.get(
        "/transactions/organizer/all"
      );

    return response.data;
  };

export const acceptTransactionService =
  async (
    id: string
  ) => {
    const response =
      await api.patch(
        `/transactions/${id}/accept`
      );

    return response.data;
  };

export const rejectTransactionService =
  async (
    id: string
  ) => {
    const response =
      await api.patch(
        `/transactions/${id}/reject`
      );

    return response.data;
  };

export const getStatisticsService =
  async () => {
    const response =
      await api.get(
        "/transactions/organizer/statistics"
      );

    return response.data;
  };

export const getMonthlyRevenueService =
  async () => {
    const response =
      await api.get(
        "/transactions/organizer/monthly-revenue"
      );

    return response.data;
  };