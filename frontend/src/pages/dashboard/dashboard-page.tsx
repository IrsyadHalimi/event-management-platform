import {
  useQuery
} from "@tanstack/react-query";

import {
  getStatisticsService,
  getMonthlyRevenueService
} from "../../services/organizer.service";

import {
  Card,
  CardContent
} from "../../components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DashboardPage() {
  const {
    data: statistics
  } = useQuery({
    queryKey: [
      "statistics"
    ],

    queryFn:
      getStatisticsService
  });

  const {
    data: revenue
  } = useQuery({
    queryKey: [
      "monthly-revenue"
    ],

    queryFn:
      getMonthlyRevenueService
  });

  return (
    <div
      className="
      space-y-6
    "
    >
      <h1
        className="
        text-3xl
        font-bold
      "
      >
        Dashboard
      </h1>

      <div
        className="
        grid
        md:grid-cols-3
        gap-6
      "
      >
        <Card>
          <CardContent
            className="p-6"
          >
            <h2>
              Total Events
            </h2>

            <p
              className="
              text-3xl
              font-bold
            "
            >
              {
                statistics
                  ?.data
                  ?.totalEvents
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            className="p-6"
          >
            <h2>
              Total Transactions
            </h2>

            <p
              className="
              text-3xl
              font-bold
            "
            >
              {
                statistics
                  ?.data
                  ?.totalTransactions
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            className="p-6"
          >
            <h2>
              Revenue
            </h2>

            <p
              className="
              text-3xl
              font-bold
            "
            >
              Rp{" "}
              {statistics?.data?.totalRevenue?.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent
          className="
          p-6
          h-[400px]
        "
        >
          <h2
            className="
            text-xl
            font-bold
            mb-4
          "
          >
            Monthly Revenue
          </h2>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={
                revenue?.data ||
                []
              }
            >
              <XAxis
                dataKey="label"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}