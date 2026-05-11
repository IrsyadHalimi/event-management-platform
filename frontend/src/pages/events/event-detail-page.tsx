import {
  useParams
} from "react-router-dom";

import {
  useQuery,
  useMutation
} from "@tanstack/react-query";

import {
  getEventDetailService
} from "../../services/event.service";

import {
  createTransactionService
} from "../../services/transaction.service";

import {
  Button
} from "../../components/ui/button";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  Input
} from "../../components/ui/input";

import {
  useState
} from "react";

import { toast }
  from "sonner";

export default function EventDetailPage() {
  const { slug } =
    useParams();

  const [quantity, setQuantity] =
    useState(1);

  const { data, isLoading } =
    useQuery({
      queryKey: [
        "event-detail",
        slug
      ],

      queryFn: () =>
        getEventDetailService(
          slug!
        )
    });

  const mutation =
    useMutation({
      mutationFn:
        createTransactionService,

      onSuccess: () => {
        toast.success(
          "Transaction created"
        );
      },

      onError: (
        error: any
      ) => {
        toast.error(
          error.response?.data
            ?.message ||
            "Checkout failed"
        );
      }
    });

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  const event =
    data?.data;

  return (
    <div
      className="
      grid
      md:grid-cols-3
      gap-8
    "
    >
      <div
        className="
        md:col-span-2
      "
      >
        <img
          src={
            event.thumbnail
              ? `http://localhost:5000/uploads/events/${event.thumbnail}`
              : "https://placehold.co/1200x600"
          }
          alt={event.title}
          className="
          w-full
          h-[400px]
          object-cover
          rounded-xl
          mb-6
        "
        />

        <h1
          className="
          text-4xl
          font-bold
          mb-4
        "
        >
          {event.title}
        </h1>

        <div
          className="
          flex
          gap-4
          mb-4
        "
        >
          <span>
            📍{" "}
            {
              event.location
            }
          </span>

          <span>
            🎟️{" "}
            {
              event.availableSeats
            }{" "}
            seats
          </span>
        </div>

        <p
          className="
          text-gray-600
          leading-relaxed
        "
        >
          {
            event.description
          }
        </p>
      </div>

      <div>
        <Card>
          <CardContent
            className="p-6"
          >
            <h2
              className="
              text-2xl
              font-bold
              mb-4
            "
            >
              {event.price ===
              0
                ? "FREE"
                : `Rp ${event?.price?.toLocaleString()}`
              }
            </h2>

            <div
              className="
              mb-4
            "
            >
              <label>
                Quantity
              </label>

              <Input
                type="number"
                value={
                  quantity
                }
                min={1}
                onChange={(
                  e
                ) =>
                  setQuantity(
                    Number(
                      e.target
                        .value
                    )
                  )
                }
              />
            </div>

            <Button
              className="
              w-full
            "
              onClick={() =>
                mutation.mutate(
                  {
                    eventId:
                      event.id,

                    quantity
                  }
                )
              }
              disabled={
                mutation.isPending
              }
            >
              {mutation.isPending
                ? "Processing..."
                : "Buy Ticket"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}