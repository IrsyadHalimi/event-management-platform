export default function UnauthorizedPage() {
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      flex-col
      gap-4
    "
    >
      <h1
        className="
        text-5xl
        font-bold
      "
      >
        403
      </h1>

      <p
        className="
        text-gray-500
      "
      >
        Unauthorized access
      </p>
    </div>
  );
}