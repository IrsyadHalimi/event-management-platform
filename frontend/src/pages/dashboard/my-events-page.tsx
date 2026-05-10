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

import {
  DeleteDialog
} from "../../components/common/delete-dialog";

import {
  EmptyState
} from "../../components/common/empty-state";

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

      {data?.data?.length ===
        0 ? (
          <EmptyState
            title="No events yet"
            description="Create your first event to start selling tickets."
          />
        ) : (
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

                <DeleteDialog
                  onConfirm={() =>
                    mutation.mutate(
                      event.id
                    )
                  }
                  loading={
                    mutation.isPending
                  }
                  title="Delete Event"
                  description="This event will be permanently deleted."
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}