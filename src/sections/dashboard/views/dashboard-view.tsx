"use client";

import Charts from "@/components/shared/Charts";
import OfferList from "@/components/shared/OfferList";
import { Box } from "@mui/material";
import SummeryCardsSection from "./SummeryCardsSection";

export default function DashboardView() {
  return (
    <Box>
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
