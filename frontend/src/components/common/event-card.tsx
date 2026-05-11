import { Event }
  from "../../types/event.type";

import {
  Card,
  CardContent
} from "../ui/card";

import {
  Badge
} from "../ui/badge";

import {
  Link
} from "react-router-dom";

import dayjs
  from "dayjs";

interface Props {
  event: Event;
}

export const EventCard =
  ({ event }: Props) => {
    return (
      <Link
        to={`/events/${event.id}`}
      >
        <Card
          className="
          hover:shadow-lg
          transition
          h-full
        "
        >
          <img
            src={
              event.thumbnail
                ? `http://localhost:5000/uploads/events/${event.thumbnail}`
                : "https://placehold.co/600x400"
            }
            alt={event.title}
            className="
            w-full
            h-48
            object-cover
            rounded-t-lg
          "
          />

          <CardContent
            className="p-4"
          >
            <div
              className="
              flex
              justify-between
              items-start
              mb-2
            "
            >
              <h2
                className="
                font-bold
                text-lg
              "
              >
                {event.title}
              </h2>

              <Badge>
                {
                  event.category
                }
              </Badge>
            </div>

            <p
              className="
              text-sm
              text-gray-500
              mb-2
            "
            >
              {
                event.location
              }
            </p>

            <p
              className="
              text-sm
              mb-4
              line-clamp-2
            "
            >
              {
                event.description
              }
            </p>

            <div
              className="
              flex
              justify-between
              items-center
            "
            >
              {event.price === 0 ? (
                
                <img
                  src="/public/free-label.png"
                  alt="Free Event"
                  className="h-6"
                />
              ) : (
                <span
                  className="
                  font-bold
                ">
                {event.price ===
                0
                  ? "FREE"
                  : `Rp ${event.price.toLocaleString()}`
                }
              </span>
              )}

              <span
                className="
                text-sm
                text-gray-500
              "
              >
                {dayjs(
                  event.startDate
                ).format(
                  "DD MMM YYYY"
                )}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };