import {
  useQuery
} from "@tanstack/react-query";

import Select from "react-select";

import {
  getEventsService
} from "../services/event.service";

import {
  EventCard
} from "../components/common/event-card";

import {
  EventSkeleton
} from "../components/common/event-skeleton";

import {
  useState
} from "react";

import {
  useDebounce
} from "use-debounce";

import {
  Input
} from "../components/ui/input";

import {
  Button
} from "../components/ui/button";

import {
  EmptyState
} from "../components/common/empty-state";


interface SelectOption {
  value: string;
  label: string;
}


export default function HomePage() {

  const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);

  const { data: eventCategories, isLoading: loadingCat } = 
    useQuery<SelectOption[]>({
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

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [debouncedSearch] =
    useDebounce(
      search,
      500
    );

  const { data, isLoading } =
    useQuery({
      queryKey: [
        "events",
        debouncedSearch,
        category,
        location,
        page
      ],

      queryFn: () =>
        getEventsService({
          search:
            debouncedSearch,

          category,

          location,

          page,

          limit: 6
        })
    });

  return (
    <div>
      <div
        className="
        mb-8
      "
      >
        <h1
          className="
          text-4xl
          font-bold
          mb-2
        "
        >
          Discover Events
        </h1>

        <p
          className="
          text-gray-500
        "
        >
          Find amazing events
          around you
        </p>
      </div>

      <div
        className="
        grid
        md:grid-cols-4
        gap-4
        mb-8
      "
      >
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

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
              setCategory(selected?.label || "");
            }}
            noOptionsMessage={() => loadingCat ? "Loading categories..." : "No categories found"}
          />
        </div>

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
        />
      </div>

      {isLoading ? (
        <div
          className="
          grid
          md:grid-cols-3
          gap-6
        "
        >
          {Array.from({
            length: 6
          }).map((_, i) => (
            <EventSkeleton
              key={i}
            />
          ))}
        </div>
      ) : data?.data
          ?.length === 0 ? (
        <div
          className="
          text-center
          py-20
        "
        >
          <h2
            className="
            text-2xl
            font-bold
          "
          >
            No Events Found
          </h2>

          <p
            className="
            text-gray-500
          "
          >
            Try another search
            keyword
          </p>
        </div>
      ) : (
        <>
          {data?.data?.length ===
            0 ? (
              <EmptyState
                title="No events found"
                description="Try changing your search or filter."
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
                  <EventCard
                    key={
                      event.id
                    }
                    event={event}
                  />
                )
              )}
            </div>
          )}

          <div
            className="
            flex
            justify-center
            gap-4
            mt-10
          "
          >
            <Button
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  (prev) =>
                    prev - 1
                )
              }
            >
              Previous
            </Button>

            <Button
              onClick={() =>
                setPage(
                  (prev) =>
                    prev + 1
                )
              }
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}