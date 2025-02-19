"use client";
import { CalendarMonth } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function OfferForm() {
  const [planType, setPlanType] = useState("monthly");
  const [additions, setAdditions] = useState({
    refundable: true,
    onDemand: false,
    negotiable: false,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography variant="h6">Create Offer</Typography>
          <Typography variant="caption">
            Send onboarding offer to new user
          </Typography>
        </Box>
        <Divider />

        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="subtitle2">Plan Type</Typography>
            <RadioGroup
              row
              value={planType}
              onChange={(e) => setPlanType(e.target.value)}
            >
              <FormControlLabel
                value="payg"
                control={<Radio />}
                label="Pay As You Go"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio color="success" />}
                label="Monthly"
              />
              <FormControlLabel
                value="yearly"
                control={<Radio />}
                label="Yearly"
              />
            </RadioGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2">Additions</Typography>
            <div className="flex space-x-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={additions.refundable}
                    color="success"
                    onChange={(e) =>
                      setAdditions({
                        ...additions,
                        refundable: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="Refundable"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={additions.onDemand}
                    onChange={(e) =>
                      setAdditions({ ...additions, onDemand: e.target.checked })
                    }
                    size="small"
                  />
                }
                label="On demand"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={additions.negotiable}
                    onChange={(e) =>
                      setAdditions({
                        ...additions,
                        negotiable: e.target.checked,
                      })
                    }
                    size="small"
                  />
                }
                label="Negotiable"
              />
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="subtitle2">User</Typography>
            <Select fullWidth value="jason" className="mt-1" size="small">
              <MenuItem value="jason">Jason Momoa</MenuItem>
              <MenuItem value="user2">Other User</MenuItem>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="subtitle2">Expired</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value="03 May 2023"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarMonth className="text-gray-500" />
                  </InputAdornment>
                ),
              }}
              className="mt-1"
              size="small"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="subtitle2">Price</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="$ Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              className="mt-1"
              size="small"
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          alignSelf: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "black",
            color: "white",
          }}
        >
          Send Offer
        </Button>
      </Box>
    </Box>
  );
}
