"use client";

import { Box } from "@mui/material";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

export default function Charts() {
  return (
    <Box display="flex" flexWrap="wrap" gap={3}>
      <BarChart />
      <LineChart />
    </Box>
  );
}
