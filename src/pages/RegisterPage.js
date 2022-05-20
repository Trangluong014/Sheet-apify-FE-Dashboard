import React, { useState } from "react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FormProvider, FTextField } from "../components/form";
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

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), "Passwords must match"]),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function RegisterPage() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/login";
    let { name, email, password } = data;
    try {
      await auth.register({ name, email, password }, () => {
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
        <Stack width="30vw" height="50vh">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1.5}>
              {!!errors.responseError && (
                <Alert severity="error">{errors.responseError.message}</Alert>
              )}
              <Typography sx={{ fontSize: "2em", textAlign: "center" }}>
                Create Account
              </Typography>
              <IconButton sx={{ alignSelf: "center", width: "1.5em" }}>
                <GoogleIcon />
              </IconButton>
              <Typography>or use your email for registration</Typography>
              <FTextField name="name" label="Name" />
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
              <FTextField
                name="passwordConfirmation"
                label="Password Confirmation"
                type={showPasswordConfirmation ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPasswordConfirmation(!showPasswordConfirmation)
                        }
                        edge="end"
                      >
                        {showPasswordConfirmation ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Register
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Stack>
        <Stack
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="center"
          width="30vw"
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
                Welcome Back!
              </Typography>
              <Typography sx={{ color: "#fff", textAlign: "center" }}>
                To keep connected with us please login with your personal info
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </Button>
            </CardActions>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}

export default RegisterPage;
