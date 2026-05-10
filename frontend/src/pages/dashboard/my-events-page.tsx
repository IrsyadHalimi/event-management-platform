import {
  useQuery,
  useMutation
} from "@tanstack/react-query";

import {
  getMyEventsService,
  deleteEventService
} from "../../services/organizer.service";

import {
  EventCard
} from "../../components/common/event-card";

import {
  Button
} from "../../components/ui/button";

import { toast }
  from "sonner";

export default function MyEventsPage() {
  const { data, refetch } =
    useQuery({
      queryKey: [
        "my-events"
      ],

      queryFn:
        getMyEventsService
    });

  const mutation =
    useMutation({
      mutationFn:
        deleteEventService,

      onSuccess: () => {
        toast.success(
          "Event deleted"
        );

        refetch();
      }
    });

  return (
    <div>
      <div
        className="
        flex
        justify-between
        items-center
        mb-6
      "
      >
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          My Events
        </h1>

        <a href="/dashboard/create-event">
          <Button>
            Create Event
          </Button>
        </a>
      </div>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
      "
      >
        {data?.data?.map(
          (event: any) => (
            <div
              key={event.id}
            >
              <EventCard
                event={event}
              />

              <Button
                variant="destructive"
                className="
                mt-2
                w-full
              "
                onClick={() => {
                  const confirmDelete =
                    confirm(
                      "Delete this event?"
                    );

                  if (
                    confirmDelete
                  ) {
                    mutation.mutate(
                      event.id
                    );
                  }
                }}
              >
                Delete
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}