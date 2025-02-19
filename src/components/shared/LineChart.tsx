import { Card, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LineChart() {
  const lineOptions: ApexOptions = {
    chart: { type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    colors: ["#000"],
    xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    yaxis: { labels: { formatter: (val) => `${val}` } },
    grid: { strokeDashArray: 4 },
  };
  const lineSeries = [{ name: "Offers", data: [10, 30, 50, 45, 70, 90, 60] }];

  return (
    <Card sx={{ flex: 1, p: 2, minWidth: 300 }}>
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
