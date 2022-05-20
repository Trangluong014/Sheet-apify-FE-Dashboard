import React, { useState } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth";

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import GoogleIcon from "@mui/icons-material/Google";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/home";
    let { email, password } = data;
    console.log(data);
    console.log(auth);
    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container>
      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Stack width="40%" height="50vh">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {!!errors.responseError && (
                <Alert severity="error">{errors.responseError.message}</Alert>
              )}
              <Typography sx={{ fontSize: "2em", textAlign: "center" }}>
                Sign In
              </Typography>
              <IconButton sx={{ alignSelf: "center", width: "1.5em" }}>
                <GoogleIcon />
              </IconButton>
              <Typography>or use your account</Typography>

              <FTextField name="email" label="Email address" />

              <FTextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <FCheckbox name="remember" label="Remember me" />
                <Link component={RouterLink} variant="subtitle2" to="/">
                  {" "}
                  Forgot password?
                </Link>
              </Stack>
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ mt: 2 }}
            >
              Login
            </LoadingButton>
          </FormProvider>
        </Stack>
        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          width="40%"
          height="50vh"
        >
          <Card
            elevation={0}
            sx={{
              backgroundColor: "rgba(58, 53, 65, 0.87)",
              alignItems: "center",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: "2em", color: "#fff", textAlign: "center" }}
                mb={2}
              >
                Hello, Friend
              </Typography>
              <Typography sx={{ color: "#fff", textAlign: "center" }}>
                Enter your personal details and start journey with Sheets-apify
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}

export default LoginPage;
