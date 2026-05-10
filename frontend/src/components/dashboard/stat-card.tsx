interface Props {
  title: string;

  value: string | number;
}

export default function StatCard({
  title,
  value
}: Props) {
  return (
    <div
      className="
      border
      rounded-2xl
      p-6
      shadow-sm
      bg-white
    "
    >
      <p
        className="
        text-sm
        text-gray-500
      "
      >
        {title}
      </p>

      <h2
        className="
        text-3xl
        font-bold
        mt-2
      "
      >
        {value}
      </h2>
    </div>
  );
}