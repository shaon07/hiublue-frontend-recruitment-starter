"use client";

import Charts from "@/components/shared/Charts";
import MultipleSelect from "@/components/shared/MultipleSelect";
import OfferList from "@/components/shared/OfferList";
import { Box, Typography } from "@mui/material";
import SummeryCardsSection from "./SummeryCardsSection";

export default function DashboardView() {
  return (
    <Box>
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

        <MultipleSelect />
      </Box>

      <SummeryCardsSection />

      <Box
        sx={{
          mt: 3,
        }}
      >
        <Charts />
      </Box>

      <Box
        sx={{
          mt: 3,
        }}
      >
        <OfferList />
      </Box>
    </Box>
  );
}
