import {
  useState
} from "react";

import Select from "react-select";

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

import { useQuery } from "@tanstack/react-query";

interface SelectOption {
  value: string;
  label: string;
}

import { useRef } from "react";

export default function CreateEventPage() {
  const navigate =
    useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    // Memaksa picker muncul saat area input diklik
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  const getLocalISOString = () => {
    const now = new Date();
    // Geser waktu sesuai timezone offset menit ke milidetik
    const tzOffset = now.getTimezoneOffset() * 60000; 
    const localISOTime = new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
    return localISOTime;
  };

  const [form, setForm] =
    useState({
      title: "",

      category: "",

      location: "",

      description: "",

      price: 0,

      availableSeats: 1,

      startDate: getLocalISOString(),

      endDate: getLocalISOString()
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

  const [selectedProvince, setSelectedProvince] = useState<SelectOption | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);

  const { data: provinces, isLoading: loadingProv } = useQuery<SelectOption[]>({
    queryKey: ["provinces"],
    queryFn: async () => {
      const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
      const data = await res.json();
      return data.map((p: any) => ({ value: p.id, label: p.name
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
       }));
    },
  });

  const { data: cities, isLoading: loadingCity } = useQuery<SelectOption[]>({
    queryKey: ["cities", selectedProvince?.value],
    queryFn: async () => {
      const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince?.value}.json`);
      const data = await res.json();
      return data.map((c: any) => ({ value: c.name
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') 
        , label: c.name
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') 
       }));
    },
    enabled: !!selectedProvince?.value,
  });

  const { data: eventCategories, isLoading: loadingCat } = useQuery<SelectOption[]>({
    queryKey: ["eventCategories"],
    queryFn: async () => {
      const res = await fetch("https://raw.githubusercontent.com/IrsyadHalimi/eventCategories/refs/heads/main/categories.json");
      
      const data = await res.json();
      
      return data.map((c: any) => ({
        value: c.name || c.name, 
        label: c.name
      }));
    },
  });

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

        <div className="space-y-2">
          <Select
            options={eventCategories || []}
            isLoading={loadingCat}
            placeholder="Choose category..."
            isClearable
            value={selectedCategory}
            onChange={(opt) => {
              const selected = opt as SelectOption | null;
              setSelectedCategory(selected);
              // Simpan ke form state
              setForm({ ...form, category: selected?.label || "" });
            }}
            noOptionsMessage={() => loadingCat ? "Loading categories..." : "No categories found"}
          />
        </div>

        <Select
          options={provinces || []}
          isLoading={loadingProv}
          placeholder="Province..."
          isClearable
          onChange={(opt) => {
            const selected = opt as SelectOption | null; 
            setSelectedProvince(selected);
            setForm({ ...form, location: selected?.label || "" });
          }}
        />

        {selectedProvince && (
          <Select
            options={cities || []}
            isLoading={loadingCity}
            placeholder="City..."
            onChange={(opt) => {
              const cityOpt = opt as SelectOption | null;
              if (cityOpt) {
                setForm({ 
                  ...form, 
                  location: `${cityOpt.label}, ${selectedProvince.label}` 
                });
              }
            }}
          />
        )}
          
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

        
        <div className="space-y-2">
          <label className="text-sm font-medium">Start</label>
          <div className="relative cursor-pointer" onClick={handleContainerClick}>
            <Input
              ref={inputRef}
              type="datetime-local"
              value={form.startDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  startDate: e.target.value
                })
              }
              
              className="cursor-pointer block [appearance:none] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0"
            />
          </div>
          
          {getFieldError("startDate") && (
            <p className="text-red-500 text-sm">{getFieldError("startDate")}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">End</label>
          <div className="relative cursor-pointer" onClick={handleContainerClick}>
            <Input
              ref={inputRef}
              type="datetime-local"
              value={form.endDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  endDate: e.target.value
                })
              }
              
              className="cursor-pointer block [appearance:none] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:left-0"
            />
          </div>
          {getFieldError("endDate") && (
            <p className="text-red-500 text-sm">{getFieldError("endDate")}</p>
          )}
        </div>

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