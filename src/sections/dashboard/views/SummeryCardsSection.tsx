import { DownStats, UpStats } from "@/components/iconify/iconify";
import MultipleSelect from "@/components/shared/MultipleSelect";
import { useSummeryApi } from "@/services/useSummeryApi";
import { formatNumber } from "@/utils";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect } from "react";

export default function SummeryCardsSection() {
  const { data, fetchDashboardData } = useSummeryApi();

  useEffect(() => {
    fetchDashboardData("this-week");
  }, []);

  const stats = [
    { label: "Total Active Users", key: "active_users" },
    { label: "Total Clicks", key: "clicks" },
    { label: "Total Appearance", key: "appearance" },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Dashboard
        </Typography>

        <MultipleSelect onChange={(data) => fetchDashboardData(data)} />
      </Box>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={3}>
          {stats.map(({ label, key }) => {
            const current = data?.current?.[key] || 0;
            const previous = data?.previous?.[key] || 0;
            const isUp = current > previous;
            const percentageChange =
              previous > 0 ? ((current - previous) / previous) * 100 : 0;

            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card sx={{ width: "100%" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {label}
                    </Typography>
                    <Typography variant="h3" component="div">
                      {formatNumber(current)}
                    </Typography>
                    <Typography
                      sx={{
                        color: "gray",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                      variant="body2"
                    >
                      {isUp ? <UpStats /> : <DownStats />}
                      <b>{percentageChange.toFixed(1)}%</b> Previous week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
