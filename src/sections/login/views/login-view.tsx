"use client";

import { FormData, loginValidationSchema } from "@/schema/login.schema";
import { useLogin } from "@/services/useLoginApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginValidationSchema),
  });
  const { apiError, login, loading } = useLogin();

  const onSubmit = async (data: FormData) => {
    await login(data);
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>

          {apiError && <Alert severity="error">{apiError}</Alert>}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                placeholder="your@email.com"
                fullWidth
                variant="outlined"
                size="small"
                {...register("email")}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                placeholder="••••••"
                fullWidth
                variant="outlined"
                size="small"
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign in"
              )}
            </Button>

            <Link component="button" type="button" variant="body2">
              Forgot your password?
            </Link>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
