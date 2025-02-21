import { OfferFormData, offerSchema } from "@/schema/createOffer.schema";
import useCreateOffer from "@/services/useCreateOfferApi";
import { useListUsersApi } from "@/services/useListUsersApi";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface OfferPayload {
  plan_type: string;
  additions: string[];
  user_id: string;
  expired: string;
  price: number;
}

export default function OfferForm() {
  const { users, fetchUsers } = useListUsersApi();
  const [statusMessage, setStatusMessage] = useState("");
  const [statusOpen, setStatusOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      user_id: { value: "", label: "" },
      plan_type: "monthly",
      expired: "",
      price: 0,
      additions: [],
    },
  });

  const { createOffer } = useCreateOffer();

  const handleFormSubmit = async (data: OfferFormData) => {
    const offerData: OfferPayload = {
      ...data,
      user_id: data.user_id.value,
      additions: data.additions,
    };

    try {
      setIsLoading(true);
      await createOffer(offerData);
      setStatusMessage("Offer created successfully!");
      setStatusOpen(true);
      reset();
    } catch (err) {
      setStatusMessage("Error creating offer. Please try again.");
      setStatusOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const options =
    users?.map((user) => ({
      value: String(user.id),
      label: user.name,
    })) || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
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
          <Box sx={{ padding: 2 }}>
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
              gap: 2,
            }}
          >
            <Controller
              name="plan_type"
              control={control}
              render={({ field }) => (
                <Box>
                  <Typography variant="subtitle2">Plan Type</Typography>
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="pay_as_you_go"
                      control={<Radio />}
                      label="Pay As You Go"
                    />
                    <FormControlLabel
                      value="monthly"
                      control={<Radio />}
                      label="Monthly"
                    />
                    <FormControlLabel
                      value="yearly"
                      control={<Radio />}
                      label="Yearly"
                    />
                  </RadioGroup>
                </Box>
              )}
            />

            <Controller
              name="additions"
              control={control}
              render={({ field }) => (
                <Box>
                  <Typography variant="subtitle2">Additions</Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value.includes("refundable")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "refundable"]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (item) => item !== "refundable"
                                )
                              );
                            }
                          }}
                        />
                      }
                      label="Refundable"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value.includes("on_demand")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "on_demand"]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (item) => item !== "on_demand"
                                )
                              );
                            }
                          }}
                        />
                      }
                      label="On-demand"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value.includes("negotiable")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, "negotiable"]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (item) => item !== "negotiable"
                                )
                              );
                            }
                          }}
                        />
                      }
                      label="Negotiable"
                    />
                  </Box>
                </Box>
              )}
            />

            <Controller
              name="user_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  onChange={(_, newValue) => {
                    setValue("user_id", newValue || { value: "", label: "" });
                  }}
                  value={
                    options.find(
                      (option) => option.value === field.value?.value
                    ) || null
                  }
                  onInputChange={(_, newInputValue, reason) => {
                    if (reason === "input") {
                      fetchUsers({ search: newInputValue });
                    }
                  }}
                  options={options}
                  getOptionLabel={(option) => option.label || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  renderInput={(params) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography variant="subtitle2">Additions</Typography>
                      <TextField
                        {...params}
                        label="Search User"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.user_id}
                        helperText={errors.user_id?.message}
                      />
                    </Box>
                  )}
                />
              )}
            />

            <Controller
              name="expired"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Typography variant="subtitle2">Expired</Typography>
                    <DatePicker
                      label="Expiration Date"
                      onChange={(date) =>
                        setValue("expired", String(date?.format("YYYY-MM-DD")))
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          variant: "outlined",
                          error: !!errors.expired,
                          helperText: errors.expired?.message,
                        },
                      }}
                    />
                  </Box>
                </LocalizationProvider>
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="subtitle2">Price</Typography>
                  <TextField
                    {...field}
                    label="Price"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    size="small"
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </Box>
              )}
            />
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "black",
            color: "white",
            m: 2,
            alignSelf: "flex-end",
          }}
          loading={isLoading}
        >
          Send Offer
        </Button>
      </form>

      <Snackbar
        open={statusOpen}
        autoHideDuration={3000}
        onClose={() => setStatusOpen(false)}
        message={statusMessage}
      />
    </Box>
  );
}
