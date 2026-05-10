export interface Event {
  id: string;

  name: string;

  slug: string;

  description: string;

  location: string;

  category: string;

  price: number;

  availableSeats: number;

  thumbnail: string;

  startDate: string;

  endDate: string;
}

export interface EventResponse {
  success: boolean;

  data: Event[];

  meta?: {
    totalData: number;

    totalPages: number;

    currentPage: number;

    limit: number;
  };
}