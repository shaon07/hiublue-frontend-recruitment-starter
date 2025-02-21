"use client";

import { useAuth } from "@/context/AuthContext";
import { useDashboardStatApi } from "@/services/useDashboardStatApi";
import { Box, Grid } from "@mui/material";
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
    <Box>
      <Grid container spacing={3}>
        {data?.website_visits && (
          <Grid item xs={12} sm={6} md={6}>
            <BarChart website_visits={data.website_visits} />
          </Grid>
        )}

        {data?.offers_sent && (
          <Grid item xs={12} sm={6} md={6}>
            <LineChart data={data.offers_sent} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
