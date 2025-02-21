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
      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        <OfferForm />
      </Box>
    </Box>
  );
}
