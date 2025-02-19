"use client";

import Charts from "@/components/shared/Charts";
import MultipleSelect from "@/components/shared/MultipleSelect";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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

      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Total active users
                  </Typography>
                  <Typography variant="h3" component="div">
                    8.2K
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        opacity="0.5"
                        d="M5.00001 17.75C4.84664 17.7501 4.69693 17.7032 4.57105 17.6156C4.44517 17.528 4.34917 17.4039 4.29598 17.2601C4.2428 17.1162 4.235 16.9595 4.27363 16.8111C4.31225 16.6627 4.39545 16.5297 4.51201 16.43L11.512 10.43C11.6479 10.3135 11.821 10.2495 12 10.2495C12.179 10.2495 12.3521 10.3135 12.488 10.43L19.488 16.43C19.6046 16.5297 19.6878 16.6627 19.7264 16.8111C19.765 16.9595 19.7572 17.1162 19.704 17.2601C19.6509 17.4039 19.5549 17.528 19.429 17.6156C19.3031 17.7032 19.1534 17.7501 19 17.75H5.00001Z"
                        fill="#22C55E"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.42999 13.488C4.49412 13.5628 4.57236 13.6243 4.66025 13.6688C4.74814 13.7134 4.84395 13.7402 4.94221 13.7477C5.04046 13.7553 5.13924 13.7434 5.23289 13.7127C5.32653 13.682 5.41322 13.6332 5.48799 13.569L12 7.988L18.512 13.569C18.5861 13.6369 18.6732 13.6892 18.768 13.7228C18.8627 13.7564 18.9633 13.7706 19.0636 13.7645C19.164 13.7585 19.2621 13.7323 19.3522 13.6876C19.4422 13.6428 19.5224 13.5805 19.5878 13.5041C19.6533 13.4278 19.7027 13.3391 19.7332 13.2433C19.7637 13.1475 19.7746 13.0465 19.7653 12.9464C19.756 12.8463 19.7266 12.7491 19.679 12.6605C19.6314 12.572 19.5664 12.4939 19.488 12.431L12.488 6.431C12.3521 6.31453 12.179 6.25052 12 6.25052C11.821 6.25052 11.6479 6.31453 11.512 6.431L4.51199 12.431C4.36118 12.5605 4.26793 12.7445 4.25274 12.9427C4.23756 13.1409 4.30167 13.337 4.43099 13.488H4.42999Z"
                        fill="#22C55E"
                      />
                    </svg>
                    <b>8.2%</b> Previous month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          mt: 3,
        }}
      >
        <Charts />
      </Box>
    </Box>
  );
}
