import { api }
  from "../lib/axios";

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

export const getDailyRevenueService =
  async () => {
    const response =
      await api.get(
        "/transactions/organizer/daily-revenue"
      );

    return response.data;
  };