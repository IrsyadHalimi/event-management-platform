import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface Props {
  data: any[];
}

export default function RevenueChart({
  data
}: Props) {
  return (
    <div
      className="
      border
      rounded-2xl
      p-6
      bg-white
      shadow-sm
    "
    >
      <h2
        className="
        text-xl
        font-bold
        mb-6
      "
      >
        Revenue Analytics
      </h2>

      <div
        className="
        h-[350px]
      "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="label"
            />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}