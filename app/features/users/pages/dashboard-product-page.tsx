import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/common/components/ui/chart";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { Route } from "./+types/dashboard-product-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard Product | suemake" }];
};

const chartData = [
  { month: "January", views: 186, visitors: 100 },
  { month: "February", views: 305, visitors: 200 },
  { month: "March", views: 237, visitors: 80 },
  { month: "April", views: 73, visitors: 150 },
  { month: "May", views: 209, visitors: 90 },
  { month: "June", views: 214, visitors: 120 },
];
const chartConfig = {
  views: {
    label: "Page views",
    color: "hsl(var(--primary))",
  },
  visitors: {
    label: "Visitors ",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function DashboardProductPage() {
  return (
    <div className="spacy-y-5">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Area
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="visitors"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />
              <ChartTooltip
                cursor={false}
                wrapperStyle={{ minWidth: "150px" }}
                content={<ChartTooltipContent hideLabel />}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
