export type TransactionStatus =
  | "WAITING_FOR_PAYMENT"
  | "WAITING_FOR_ADMIN_CONFIRMATION"
  | "DONE"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELED";

export interface Transaction {
  id: string;

  quantity: number;

  totalPrice: number;

  paymentProof: string;

  status:
    TransactionStatus;

  expiredAt: string;

  createdAt: string;

  event: {
    id: string;

    name: string;

    slug: string;

    thumbnail: string;
  };
}