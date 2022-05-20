import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  InputAdornment,
  IconButton,
  FilledInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
} from "@mui/material";
import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import noImage from "../components/no-image.png";

import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import {
  FormProvider,
  FTextField,
  FRadioGroup,
  FSelect,
} from "../components/form";
import apiService from "../app/apiService";
import LinkIcon from "@mui/icons-material/Link";
import { yupResolver } from "@hookform/resolvers/yup";
import MonacoEditor from "../components/MonacoEditor";
import useAuth from "../hooks/useAuth";

const UserSchema = Yup.object().shape({
  name: Yup.string(),
  phone: Yup.string(),
  company: Yup.string(),
  job: Yup.string(),
});

function UserAccount() {
  const { user } = useAuth();
  const avatarInputRef = useRef(null);
  const [avatarInput, setAvatarInput] = useState(user?.avatar);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues = {
    name: user.name || "",
    email: user.email || "",
    job: user.job || "",
    company: user.company || "",
  };
  console.log("defaultValues", defaultValues);

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    (data) => {
      const submitData = async () => {
        try {
          const putData = {
            name: data.name,
            job: data.job,
            company: data.company,
            avatar: avatarInput,
          };
          const response = await apiService.put(`/admin/profile`, putData);
          navigate("/home", { replace: true });
        } catch {}
      };
      submitData();
    },
    [user, avatarInput]
  );

  const handleDeactivate = async () => {
    const response = await apiService.delete(`/admin/deactive`);
    navigate("/home");
  };

  const handleAvatarChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        const onReaderLoad = function () {
          setAvatarInput(reader.result);
        };
        reader.addEventListener("load", onReaderLoad);
        reader.readAsDataURL(file);
      }
    },
    [setAvatarInput]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title={`${user.email} `} />

        <CardContent>
          <input
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            ref={avatarInputRef}
            onChange={handleAvatarChange}
          />
          {avatarInput ? (
            <img src={avatarInput} alt="avatar" height="200" width="200" />
          ) : (
            <img src={noImage} alt="no avatar" height="200" width="200" />
          )}
          <div>
            <Button
              variant="contained"
              onClick={() => {
                console.log("input ref", avatarInputRef.current);
                avatarInputRef.current && avatarInputRef.current.click();
              }}
            >
              Upload avatar
            </Button>
          </div>
        </CardContent>

        <CardContent>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <FTextField name="name" label="Name" />
                <FTextField name="email" label="Email" disabled />

                <FTextField name="job" label="Job Title" />
                <FTextField name="company" label="Company" />
              </Box>
            </FormControl>
          </Box>
        </CardContent>

        <CardActions style={{ justifyContent: "space-between" }}>
          <Button disabled={isSubmitting} type="submit">
            Update Profile
          </Button>
          <Button color="error" onClick={handleDeactivate}>
            Deactive User
          </Button>
        </CardActions>
      </Card>
    </FormProvider>
  );
}

export default UserAccount;
