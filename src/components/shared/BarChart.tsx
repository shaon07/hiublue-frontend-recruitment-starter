import { Card, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChart() {
  const barOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    colors: ["#2F855A", "#F6AD55"],
    legend: { position: "top", horizontalAlign: "left" },
    xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    yaxis: { labels: { formatter: (val) => `${val}` } },
    grid: { strokeDashArray: 4 },
  };
  const barSeries = [
    { name: "Desktop", data: [40, 60, 25, 45, 50, 70, 90] },
    { name: "Mobile", data: [30, 45, 40, 35, 20, 15, 55] },
  ];

  return (
    <Card sx={{ flex: 1, p: 2, minWidth: 300 }}>
      <Typography fontWeight={600}>Website visits</Typography>
      <Chart options={barOptions} series={barSeries} type="bar" height={250} />
    </Card>
  );
}
