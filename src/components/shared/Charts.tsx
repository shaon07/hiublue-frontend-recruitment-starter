"use client";

import { useAuth } from "@/context/AuthContext";
import { useDashboardStatApi } from "@/services/useDashboardStatApi";
import { Box } from "@mui/material";
import { useEffect } from "react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

export default function Charts() {
  const { filter } = useAuth();
  const { data, loading, fetchStat } = useDashboardStatApi();

  useEffect(() => {
    fetchStat(filter);
  }, [filter]);

  if (loading) return <div>Loading...</div>;

  return (
    <Box display="flex" flexWrap="wrap" gap={3}>
      {data?.website_visits && (
        <BarChart website_visits={data.website_visits} />
      )}

      {data?.offers_sent && <LineChart data={data.offers_sent} />}
    </Box>
  );
}
