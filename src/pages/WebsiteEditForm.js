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
  Tabs,
  Tab,
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
import { getWebsiteUrl, TEMPLATE_OPTIONS } from "../app/constants";
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
import ConfigurationEditor, {
  filterAddtionalConfig,
} from "../components/ConfigurationEditor";
import { deepmerge } from "@mui/utils";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ display: "flex", flex: 1 }}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, overflow: "hidden", flex: 1 }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const WebsiteSchema = Yup.object().shape({
  name: Yup.string().required("Display name is required").trim(),
  ranges: Yup.array(Yup.string().trim()).required("Data Range is required"),
  config: Yup.object(),
  additionalConfig: Yup.string().trim(),
});

function WebsiteEditForm({ websiteId, website, ranges }) {
  const logoInputRef = useRef(null);
  const [logoInput, setLogoInput] = useState(website?.config?.logo);
  const [tab, setTab] = useState(0);

  const params = useMemo(() => ({ websiteId }), [websiteId]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleWebsite(params));
  }, [params, dispatch]);

  const websiteTemplate = useMemo(() => {
    return TEMPLATE_OPTIONS[website?.template] || {};
  }, [website]);

  const websiteConfig = useMemo(() => {
    const { logo, ...config } = website.config || {};
    const configTemplate = websiteTemplate.configTemplate || {};

    return JSON.stringify(
      filterAddtionalConfig(websiteTemplate.config, configTemplate),
      null,
      2
    );
  }, [website]);

  const defaultValues = {
    name: website.name || "",
    ranges: website.ranges || [],
    config: website.config || {},
    additionalConfig: websiteConfig,
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
        const tryParse = (str) => {
          try {
            return JSON.parse(str);
          } catch {
            return {};
          }
        };
        try {
          const merged = deepmerge(
            tryParse(data.additionalConfig),
            data.config || {},
            { clone: true }
          );
          const patchData = {
            name: data.name,
            ranges: data.ranges,
            config: {
              ...merged,
              logo: logoInput || website?.config?.logo,
            },
          };
          const response = await apiService.patch(
            `/website/${websiteId}`,
            patchData
          );
          navigate("/home", { replace: true });
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
      <Grid container sx={{ bgcolor: "background.paper" }}>
        <Grid item xs={3} spacing={0}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Data Source" {...a11yProps(1)} />
            <Tab label="Configuration" {...a11yProps(1)} />
            <Tab label="Moderation" {...a11yProps(2)} />
          </Tabs>
        </Grid>

        <Grid item xs={9}>
          <TabPanel value={tab} index={0}>
            <Card elevation={0}>
              <CardHeader
                title={`${website.name} (${website.websiteId})`}
                subheader={`Last updated: ${new Date(
                  parseInt(website.lastUpdate)
                ).toLocaleString()}`}
                action={
                  <IconButton
                    aria-label="Visit Website"
                    onClick={() =>
                      (window.location.href = getWebsiteUrl(website))
                    }
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
                <FTextField
                  required
                  name="name"
                  label="Display Name"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <Card elevation={0}>
              <CardContent>
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
                <Controller
                  name="ranges"
                  control={control}
                  render={({
                    field: { value, ...field },
                    fieldState: { error },
                  }) => (
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <InputLabel variant="filled" id="ranges-label">
                        Ranges
                      </InputLabel>
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
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <Card elevation={0}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  Configuration
                </Typography>
                <Controller
                  name="config"
                  control={control}
                  render={({ field: { ...field }, fieldState: { error } }) => (
                    <ConfigurationEditor
                      {...field}
                      template={websiteTemplate?.configTemplate || {}}
                    />
                  )}
                />
                <Controller
                  name="additionalConfig"
                  control={control}
                  render={({ field: { ...field }, fieldState: { error } }) => (
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
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tab} index={3}>
            <Card elevation={0}>
              <Button
                color="error"
                onClick={() => {
                  dispatch(deleteSingleWebsite(params));
                  navigate("/home");
                }}
              >
                Delete Website
              </Button>
            </Card>
          </TabPanel>
        </Grid>
      </Grid>

      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <Button disabled={isSubmitting} type="submit">
          Update Website
        </Button>
      </div>
    </FormProvider>
  );
}

export default WebsiteEditForm;
