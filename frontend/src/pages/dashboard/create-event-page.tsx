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
      title: "",

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
  
  const [validationErrors, setValidationErrors] = useState<any[]>([]);

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

      onError: (error: any) => {
        const errorData = error.response?.data;
        
        if (errorData?.errors) {
          setValidationErrors(errorData.errors);
          toast.error("Please check the form for errors");
        } else {
          toast.error(errorData?.message || "Failed");
        }
      }
    });

  const handleSubmit =
    () => {
      setValidationErrors([]);
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

      console.log(Object.fromEntries(formData.entries()));

      mutation.mutate(
        formData
      );
    };

  const getFieldError = (path: string) => {
    return validationErrors.find((err) => err.path.includes(path))?.message;
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
          placeholder="Event Title"
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value
            })
          }
        />
        {getFieldError("title") && (
          <p className="text-red-500 text-sm">{getFieldError("title")}</p>
        )}

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
        {getFieldError("category") && (
          <p className="text-red-500 text-sm">{getFieldError("category")}</p>
        )}

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
        {getFieldError("location") && (
          <p className="text-red-500 text-sm">{getFieldError("location")}</p>
        )}

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
        {getFieldError("description") && (
          <p className="text-red-500 text-sm">{getFieldError("description")}</p>
        )}
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
        {getFieldError("price") && (
          <p className="text-red-500 text-sm">{getFieldError("price")}</p>
        )}

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
        {getFieldError("availableSeats") && (
          <p className="text-red-500 text-sm">{getFieldError("availableSeats")}</p>
        )}
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
        {getFieldError("startDate") && (
          <p className="text-red-500 text-sm">{getFieldError("startDate")}</p>
        )}
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
        {getFieldError("endDate") && (
          <p className="text-red-500 text-sm">{getFieldError("endDate")}</p>
        )}

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
        {getFieldError("thumbnail") && (
          <p className="text-red-500 text-sm">{getFieldError("thumbnail")}</p>
        )}
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