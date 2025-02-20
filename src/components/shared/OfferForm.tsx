import useCreateOffer from "@/services/useCreateOfferApi";
import useUserListApi from "@/services/useUserListApi";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

export default function OfferForm() {
  const [user, setUser] = useState("");
  const { users, loading, error } = useUserListApi(user);
  const [selectedUser, setSelectedUser] = useState<{
    value: any;
    label: any;
  } | null>(null);
  const [planType, setPlanType] = useState("monthly");
  const [expired, setExpired] = useState("");
  const [price, setPrice] = useState("");
  const [additions, setAdditions] = useState({
    refundable: false,
    on_demand: false,
    negotiable: false,
  });

  const options =
    users?.map((user) => {
      return { value: String(user.id), label: user.user_name };
    }) || [];

  // Using the useCreateOffer hook
  const { createOffer, isLoading, error: apiError, success } = useCreateOffer();

  const handleSubmit = async () => {
    if (selectedUser) {
      const offerData = {
        plan_type: planType,
        additions: Object.entries(additions)
          .filter(([key, value]) => value)
          .map(([key]) => key),
        user_id: selectedUser.value,
        expired: expired,
        price: parseFloat(price),
      };
      await createOffer(offerData);
    }
  };

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
                value="pay_as_you_go"
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

          {/* Additions Section */}
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
                    checked={additions.on_demand}
                    onChange={(e) =>
                      setAdditions({
                        ...additions,
                        on_demand: e.target.checked,
                      })
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

          {/* User Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2">User</Typography>
            <Autocomplete
              onChange={(event, newValue) => {
                setSelectedUser(newValue);
              }}
              inputValue={user}
              onInputChange={(event, newInputValue) => {
                setUser(newInputValue);
              }}
              options={options}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search User"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={!!error}
                  helperText={error}
                />
              )}
            />
          </Box>

          {/* Expiry Date Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2">Expired</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Basic date picker"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: "small",
                    variant: "outlined",
                  },
                }}
                onChange={(date) =>
                  setExpired(String(date?.format("YYYY-MM-DD")))
                }
              />
            </LocalizationProvider>
          </Box>

          {/* Price Section */}
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
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1"
              size="small"
            />
          </Box>
        </Box>
      </Box>

      {/* Submit Button */}
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
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Sending Offer..." : "Send Offer"}
        </Button>
      </Box>

      {/* Error or Success Messages */}
      {apiError && (
        <Typography color="error" sx={{ textAlign: "center", marginTop: 2 }}>
          {apiError}
        </Typography>
      )}
      {success && (
        <Typography color="success" sx={{ textAlign: "center", marginTop: 2 }}>
          Offer created successfully!
        </Typography>
      )}
    </Box>
  );
}
