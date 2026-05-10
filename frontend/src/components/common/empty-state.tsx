interface Props {
  title: string;

  description?: string;
}

export const EmptyState =
  ({
    title,
    description
  }: Props) => {
    return (
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        py-16
        text-center
      "
      >
        <h2
          className="
          text-2xl
          font-bold
          mb-2
        "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
            text-gray-500
            max-w-md
          "
          >
            {
              description
            }
          </p>
        )}
      </div>
    );
  };