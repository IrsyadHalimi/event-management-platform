export interface CreateEventPayload {
  title: string;

  description: string;

  category: string;

  location: string;

  price: number;

  availableSeats: number;

  startDate: string;

  endDate: string;

  thumbnail?: string;
}