import { api }
  from "../lib/axios";

export const createTransactionService =
  async (
    payload: {
      eventId: string;

      quantity: number;
    }
  ) => {
    const response =
      await api.post(
        "/transactions",
        payload
      );

    return response.data;
  };

export const uploadPaymentProofService =
  async (
    id: string,
    formData: FormData
  ) => {
    const response =
      await api.post(
        `/transactions/${id}/upload-proof`,
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

export const getMyTransactionsService =
  async () => {
    const response =
      await api.get(
        "/transactions/my-transactions"
      );

    return response.data;
  };

export const cancelTransactionService =
  async (
    id: string
  ) => {
    const response =
      await api.patch(
        `/transactions/${id}/cancel`
      );

    return response.data;
  };