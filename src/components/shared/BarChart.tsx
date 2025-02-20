import { Card, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface WebsiteVisits {
  monday: { desktop: number; mobile: number };
  tuesday: { desktop: number; mobile: number };
  wednesday: { desktop: number; mobile: number };
  thursday: { desktop: number; mobile: number };
  friday: { desktop: number; mobile: number };
  saturday: { desktop: number; mobile: number };
  sunday: { desktop: number; mobile: number };
}

interface BarChartProps {
  website_visits: WebsiteVisits;
}

export default function BarChart({ website_visits }: BarChartProps) {
  const days = Object.keys(website_visits);

  const desktopData = days.map(
    (day) => website_visits[day as keyof WebsiteVisits].desktop
  );
  const mobileData = days.map(
    (day) => website_visits[day as keyof WebsiteVisits].mobile
  );

  const barOptions: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
    dataLabels: { enabled: false },
    colors: ["#2F855A", "#F6AD55"],
    legend: { position: "top", horizontalAlign: "left" },
    xaxis: { categories: days },
    yaxis: { labels: { formatter: (val) => `${val}` } },
    grid: { strokeDashArray: 4 },
  };

  const barSeries = [
    { name: "Desktop", data: desktopData },
    { name: "Mobile", data: mobileData },
  ];

  return (
    <Card sx={{ flex: 1, p: 2, minWidth: 300 }}>
      <Typography fontWeight={600}>Website visits</Typography>
      <Chart options={barOptions} series={barSeries} type="bar" height={250} />
    </Card>
  );
}
