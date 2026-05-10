import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  useMutation,
  useQuery
} from "@tanstack/react-query";

import {
  getEventDetailService,
  updateEventService
} from "../../services/event.service";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  Input
} from "../../components/ui/input";

import {
  Textarea
} from "../../components/ui/textarea";

import {
  Button
} from "../../components/ui/button";

import { toast }
  from "sonner";

export default function EditEventPage() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [location,
    setLocation] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [availableSeats,
    setAvailableSeats] =
    useState("");

  const [startDate,
    setStartDate] =
    useState("");

  const [endDate,
    setEndDate] =
    useState("");

  const { data } =
    useQuery({
      queryKey: [
        "event-detail",
        id
      ],

      queryFn: () =>
        getEventDetailService(
          id!
        )
    });

  useEffect(() => {
    if (data?.data) {
      const event =
        data.data;

      setName(
        event.name
      );

      setDescription(
        event.description
      );

      setPrice(
        String(
          event.price
        )
      );

      setLocation(
        event.location
      );

      setCategory(
        event.category
      );

      setAvailableSeats(
        String(
          event.availableSeats
        )
      );

      setStartDate(
        event.startDate.slice(
          0,
          16
        )
      );

      setEndDate(
        event.endDate.slice(
          0,
          16
        )
      );
    }
  }, [data]);

  const mutation =
    useMutation({
      mutationFn:
        (
          payload: FormData
        ) =>
          updateEventService(
            id!,
            payload
          ),

      onSuccess: () => {
        toast.success(
          "Event updated"
        );

        navigate(
          "/dashboard/my-events"
        );
      },

      onError: () => {
        toast.error(
          "Failed to update event"
        );
      }
    });

  const handleSubmit =
    () => {
      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "price",
        price
      );

      formData.append(
        "location",
        location
      );

      formData.append(
        "category",
        category
      );

      formData.append(
        "availableSeats",
        availableSeats
      );

      formData.append(
        "startDate",
        startDate
      );

      formData.append(
        "endDate",
        endDate
      );

      mutation.mutate(
        formData
      );
    };

  return (
    <div
      className="
      max-w-3xl
      mx-auto
    "
    >
      <Card>
        <CardContent
          className="
          p-6
          space-y-4
        "
        >
          <h1
            className="
            text-2xl
            font-bold
          "
          >
            Edit Event
          </h1>

          <Input
            placeholder="Event name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <Textarea
            placeholder="Description"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Location"
            value={
              location
            }
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          />

          <Input
            placeholder="Category"
            value={
              category
            }
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />

          <Input
            type="number"
            placeholder="Seats"
            value={
              availableSeats
            }
            onChange={(e) =>
              setAvailableSeats(
                e.target.value
              )
            }
          />

          <Input
            type="datetime-local"
            value={
              startDate
            }
            onChange={(e) =>
              setStartDate(
                e.target.value
              )
            }
          />

          <Input
            type="datetime-local"
            value={
              endDate
            }
            onChange={(e) =>
              setEndDate(
                e.target.value
              )
            }
          />

          <Button
            className="
            w-full
          "
            onClick={
              handleSubmit
            }
            disabled={
              mutation.isPending
            }
          >
            {mutation.isPending
              ? "Updating..."
              : "Update Event"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}