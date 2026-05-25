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

import dayjs
  from "dayjs";
import { Minus, Plus } from "lucide-react";

import {
  useAuthStore
} from "../../store/auth.store";

export default function EventDetailPage() {
  const user = useAuthStore((state) => state.user);

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
        window.location.href = "/dashboard/my-transactions";
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
            seats available
          </span>

          <div className="flex items-center gap-1 
              text-sm
              text-gray-500">
              📆{" "}
            <span
              className="
            "
            >
              {dayjs(
                event.startDate
              ).format(
                "DD MMM YYYY HH:mm"
              )}
            </span>
            {event.startDate !== event.endDate && (
              <>
                {" "}
              - 
              <span
                className="
                text-sm
                text-gray-500
              "
              >
                {dayjs(
                  event.endDate
                ).format(
                  "DD MMM YYYY HH:mm"
                )}
              </span>
              </>
            )}
          </div>
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
                : `${event?.price?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0
                  })} per ticket`
              }
            </h2>

            {user?.role === "CUSTOMER" && (<>
            <div className="flex justify-between mb-6 gap-2">
              <label className="text-sm font-medium text-foreground my-auto">
                Quantity:
              </label>

              <div className="flex items-center w-fit min-w-[120px] h-9 border rounded-md bg-background overflow-hidden">
                {/* 1. Tombol Minus */}
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  className="h-full w-9 rounded-none hover:bg-muted shrink-0 text-muted-foreground disabled:opacity-30"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1} // Tombol mati jika qty sudah angka 1
                >
                  <Minus className="h-4 w-4 red" />
                </Button>

                {/* 2. Input Angka Tengah (Menghilangkan panah spin bawaan browser) */}
                <Input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    // Memastikan jika user mengetik manual, nilainya tidak boleh di bawah 1
                    setQuantity(val < 1 ? 1 : val);
                  }}
                  className="h-full w-12 rounded-none border-0 p-0 text-center text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                {/* 3. Tombol Plus */}
                <Button
                  type="button"
                  variant="default"
                  size="icon"
                  className="h-full w-9 rounded-none hover:bg-muted shrink-0 text-muted-foreground"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= event.availableSeats} // Tombol mati jika qty sudah mencapai available seats
                >
                  <Plus className="h-4 w-4 purple" />
                </Button>
              </div>
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
            </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}