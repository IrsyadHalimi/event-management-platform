import {
  Skeleton
} from "../ui/skeleton";

export const EventSkeleton =
  () => {
    return (
      <div
        className="
        border
        rounded-lg
        p-4
      "
      >
        <Skeleton
          className="
          w-full
          h-48
          mb-4
        "
        />

        <Skeleton
          className="
          h-6
          w-2/3
          mb-2
        "
        />

        <Skeleton
          className="
          h-4
          w-1/2
          mb-2
        "
        />

        <Skeleton
          className="
          h-4
          w-full
          mb-2
        "
        />

        <Skeleton
          className="
          h-4
          w-1/3
        "
        />
      </div>
    );
  };