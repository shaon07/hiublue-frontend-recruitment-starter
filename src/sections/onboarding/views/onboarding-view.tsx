"use client";

import OfferForm from "@/components/shared/OfferForm";
import { Box } from "@mui/material";

export default function OnboardingView() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <OfferForm />
      </Box>
    </Box>
  );
}
