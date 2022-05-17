import {
  Box,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
  TextField,
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
  CardActionArea,
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
import {
  getSingleWebsite,
  deleteSingleWebsite,
} from "../features/websites/websiteSlice";
import { getWebsiteUrl } from "../app/constants";
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

const WebsiteSchema = Yup.object().shape({
  name: Yup.string().required("Display name is required").trim(),
  ranges: Yup.array(Yup.string().trim()).required("Data Range is required"),
  config: Yup.string().trim(),
});

function WebsiteEditForm({ websiteId, website, ranges }) {
  const logoInputRef = useRef(null);
  const [logoInput, setLogoInput] = useState(website?.config?.logo);

  const params = useMemo(() => ({ websiteId }), [websiteId]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleWebsite(params));
  }, [params, dispatch]);

  const websiteConfig = useMemo(() => {
    const { logo, ...config } = website.config || {};
    return JSON.stringify(config);
  }, [website]);
  const defaultValues = {
    name: website.name || "",
    ranges: website.ranges || [],
    config: websiteConfig,
  };
  console.log("defaultValues", defaultValues);

  const methods = useForm({
    resolver: yupResolver(WebsiteSchema),
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
          const patchData = {
            name: data.name,
            ranges: data.ranges,
            config: {
              ...JSON.parse(data.config),
              logo: logoInput || website?.config?.logo,
            },
          };
          const response = await apiService.patch(
            `/website/${websiteId}`,
            patchData
          );
          navigate("/", { replace: true });
        } catch {}
      };
      submitData();
    },
    [websiteId, logoInput]
  );

  const handleLogoChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        const onReaderLoad = function () {
          setLogoInput(reader.result);
        };
        reader.addEventListener("load", onReaderLoad);
        reader.readAsDataURL(file);
      }
    },
    [setLogoInput]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          title={`${website.name} (${website.websiteId})`}
          subheader={`Last updated: ${new Date(
            parseInt(website.lastUpdate)
          ).toLocaleString()}`}
          action={
            <IconButton
              aria-label="Visit Website"
              onClick={() => (window.location.href = getWebsiteUrl(website))}
            >
              <LinkIcon />
            </IconButton>
          }
        />

        <CardContent>
          <input
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            ref={logoInputRef}
            onChange={handleLogoChange}
          />
          {logoInput ? (
            <img src={logoInput} alt="logo" />
          ) : (
            <img src={noImage} alt="no logo" />
          )}
          <div>
            <Button
              variant="contained"
              onClick={() => {
                console.log("input ref", logoInputRef.current);
                logoInputRef.current && logoInputRef.current.click();
              }}
            >
              Upload Logo
            </Button>
          </div>
        </CardContent>

        <CardContent>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel>Template</InputLabel>
              <FilledInput
                disabled
                variant="outlined"
                value={website.template}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel>Spreadsheet ID</InputLabel>
              <FilledInput
                disabled
                variant="outlined"
                value={website.spreadsheetId}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <LinkIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FTextField
              required
              name="name"
              label="Display Name"
              variant="outlined"
            />

            <Controller
              name="ranges"
              control={control}
              render={({
                field: { value, ...field },
                fieldState: { error },
              }) => (
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                  <InputLabel id="ranges-label">Ranges</InputLabel>
                  <Select
                    labelId="ranges-label"
                    required
                    multiple
                    renderValue={(selected) => selected.join(", ")}
                    value={value}
                    {...field}
                  >
                    {ranges.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={value.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Typography variant="body1" gutterBottom>
              Configuration
            </Typography>
            <Controller
              name="config"
              control={control}
              render={({
                field: { value, ...field },
                fieldState: { error },
              }) => (
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <Input
                    inputComponent={MonacoEditor}
                    multiline
                    height="250px"
                    {...field}
                  />
                </FormControl>
              )}
            />
          </Box>
        </CardContent>

        <CardActions style={{ justifyContent: "space-between" }}>
          <Button disabled={isSubmitting} type="submit">
            Update Website
          </Button>
          <Button
            color="error"
            onClick={() => {
              dispatch(deleteSingleWebsite(params));
              navigate("/");
            }}
          >
            Delete Website
          </Button>
        </CardActions>
      </Card>
    </FormProvider>
  );
}

export default WebsiteEditForm;
