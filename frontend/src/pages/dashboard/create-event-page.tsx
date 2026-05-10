import {
  useState
} from "react";

import {
  useMutation
} from "@tanstack/react-query";

import {
  createEventService
} from "../../services/organizer.service";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  Input
} from "../../components/ui/input";

import {
  Button
} from "../../components/ui/button";

import {
  Textarea
} from "../../components/ui/textarea";

import { toast }
  from "sonner";

import {
  useNavigate
} from "react-router-dom";

export default function CreateEventPage() {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",

      category: "",

      location: "",

      description: "",

      price: 0,

      availableSeats: 1,

      startDate: "",

      endDate: ""
    });

  const [thumbnail, setThumbnail] =
    useState<File | null>(
      null
    );

  const mutation =
    useMutation({
      mutationFn:
        createEventService,

      onSuccess: () => {
        toast.success(
          "Event created"
        );

        navigate(
          "/dashboard/my-events"
        );
      },

      onError: (
        error: any
      ) => {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed"
        );
      }
    });

  const handleSubmit =
    () => {
      const formData =
        new FormData();

      Object.entries(
        form
      ).forEach(
        ([key, value]) => {
          formData.append(
            key,
            String(value)
          );
        }
      );

      if (thumbnail) {
        formData.append(
          "thumbnail",
          thumbnail
        );
      }

      mutation.mutate(
        formData
      );
    };

  return (
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
          Create Event
        </h1>

        <Input
          placeholder="Event name"
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value
            })
          }
        />

        <Input
          placeholder="Category"
          onChange={(e) =>
            setForm({
              ...form,
              category:
                e.target.value
            })
          }
        />

        <Input
          placeholder="Location"
          onChange={(e) =>
            setForm({
              ...form,
              location:
                e.target.value
            })
          }
        />

        <Textarea
          placeholder="Description"
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value
            })
          }
        />

        <Input
          type="number"
          placeholder="Price"
          onChange={(e) =>
            setForm({
              ...form,
              price:
                Number(
                  e.target
                    .value
                )
            })
          }
        />

        <Input
          type="number"
          placeholder="Available seats"
          onChange={(e) =>
            setForm({
              ...form,
              availableSeats:
                Number(
                  e.target
                    .value
                )
            })
          }
        />

        <Input
          type="datetime-local"
          onChange={(e) =>
            setForm({
              ...form,
              startDate:
                e.target.value
            })
          }
        />

        <Input
          type="datetime-local"
          onChange={(e) =>
            setForm({
              ...form,
              endDate:
                e.target.value
            })
          }
        />

        <Input
          type="file"
          onChange={(e) =>
            setThumbnail(
              e.target
                .files?.[0] ||
                null
            )
          }
        />

        <Button
          onClick={
            handleSubmit
          }
          disabled={
            mutation.isPending
          }
        >
          {mutation.isPending
            ? "Loading..."
            : "Create Event"}
        </Button>
      </CardContent>
    </Card>
  );
}