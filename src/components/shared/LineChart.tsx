import { Card, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartProps = {
  data: Record<string, any>;
};

export default function LineChart({ data }: ChartProps) {
  const lineOptions: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    colors: ["#000"],
    xaxis: { categories: Object.keys(data) },
    yaxis: { labels: { formatter: (val) => `${val}` } },
    grid: { strokeDashArray: 4 },
  };
  const lineSeries = [{ name: "Offers", data: Object.values(data) }];

  return (
    <Card sx={{ flex: 1, p: 2, width: "100%" }}>
      <Typography fontWeight={600}>Offers sent</Typography>
      <Chart
        options={lineOptions}
        series={lineSeries}
        type="line"
        height={250}
      />
    </Card>
  );
}
