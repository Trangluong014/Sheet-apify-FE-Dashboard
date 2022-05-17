import { useCallback, useState, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { 
  Button, 
  Typography, 
  Container,
  Card,
  CardHeader, 
  CardContent,
  CardActions,
  Stack,
  Alert,
  FormLabel,
  MenuItem,
  TextField,
  Checkbox,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import noImage from "../components/no-image.png";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FormProvider, FTextField, FRadioGroup, FSelect } from "../components/form";
import * as Yup from "yup";
import apiService from "../app/apiService";
import { useNavigate } from "react-router-dom";
import { TEMPLATE_OPTIONS } from "../app/constants";
import MonacoEditor from "../components/MonacoEditor";


const URL_REGEX = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;

const WebsiteSchema = Yup.object().shape({
  websiteId: Yup.string().trim().lowercase().matches(/^[a-z0-9.\-_]+$/).required("Name is required"),
  name: Yup.string().required("Display name is required").trim(),
  spreadsheetUrl: Yup.string().url().required("Spreadsheet Url is required").trim(),
  ranges:Yup.array(Yup.string().trim()).required("Data Range is required"),
  template:Yup.string().required("Template is required").trim(),
  config: Yup.string().trim(),
});

const defaultValues = {
  websiteId: "",
  name: "",
  spreadsheetUrl: "",
  ranges: [],
  template: "template2",
  config: "{}",
};

function WebCreatePage() {
  const methods = useForm({
    resolver: yupResolver(WebsiteSchema),
    defaultValues,
  });
  const logoInputRef = useRef(null);
  const [logoInput, setLogoInput] = useState("");

  const {
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();
  const [ranges, setRanges] = useState([]);
  const setWebsiteName = useCallback(({ onChange }) => (e) => {
    const value = e?.target?.value?.toLowerCase() || ""
    e.target.value = value;
    onChange(e)
  }, []);

  const getRanges = useCallback(async (spreadsheet_url) => {
    try {
      const response = await apiService.get(`/google/spreadsheet/sheet`, { params: {
        spreadsheet_url,
      }})
      setRanges(response?.data?.data);
    }
    catch {}
  }, [setRanges])

  const setSpreadsheetUrl = useCallback(({ onChange }) => (e) => {
    onChange(e);
    const spreadsheet_url = e?.target?.value;
    
    if (spreadsheet_url.match(URL_REGEX)) {
      getRanges(spreadsheet_url);
    }
    else {
      setRanges([]);
    }
  }, [setRanges]);
  const handleLogoChange = useCallback((e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader();

      const onReaderLoad = function () {
        setLogoInput(reader.result);
      }
      reader.addEventListener("load", onReaderLoad); 
      reader.readAsDataURL(file);
    }
  }, [setLogoInput])
  const onSubmit = useCallback(async (data) => {
    const tryParse = (str) => {
      try {
        return JSON.parse(str);
      }
      catch {
        return {};
      }
    }
    const submitData = async () => {
      try {
        const createData = {
          ...data,
          config: {
            ...tryParse(data.config),
            logo: logoInput,
          },
        }
        const response = await apiService.post("/website/create", createData);
        navigate("/", { replace: true });
      }
      catch {}
    }
    submitData();
  }, [logoInput]);

  return (
    <Container sx={{ my: 3 }}>
      <Card>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title="Create Website" />
          <CardContent>
            <Stack spacing={3}>
              {!!errors.responseError && (
                <Alert severity="error">{errors.responseError.message}</Alert>
              )}

              <div>
                <input 
                  accept="image/*" 
                  type="file" 
                  style={{ display: "none" }}
                  ref={logoInputRef}
                  onChange={handleLogoChange}
                />
                {logoInput
                  ? <img src={logoInput} alt="logo" />
                  : <img src={noImage} alt="no logo" />}
                <div>
                  <Button variant="contained" onClick={() => {
                    console.log("input ref", logoInputRef.current);
                    logoInputRef.current && logoInputRef.current.click()
                  }}>
                    Upload Logo
                  </Button>
                </div>
              </div>

              <Controller
                name="websiteId"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    required
                    name="websiteId" 
                    label="Website Name"
                    variant="filled"
                    fullWidth
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    onChange={setWebsiteName(field)}
                  />
                )}
              />

              <FTextField 
                required
                name="name" 
                label="Display Name"
                variant="filled"
              />

              <FormLabel>Template</FormLabel>
              <FRadioGroup 
                name="template" 
                options={Object.keys(TEMPLATE_OPTIONS)}
                getOptionLabel={(option) => TEMPLATE_OPTIONS[option].component}
                labelProps={{
                  labelPlacement: "top"
                }}
              />

              <Controller
                name="spreadsheetUrl"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    required
                    name="spreadsheetUrl" 
                    label="Google Sheet URL"
                    variant="filled"
                    fullWidth
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    onChange={setSpreadsheetUrl(field)}

                  />
                )}
              />

              {ranges.length 
                ? <Controller
                  name="ranges"
                  control={control}
                  render={({ field: {value, ...field}, fieldState: { error } }) => (
                    <FormControl>
                      <InputLabel id="ranges-label">Ranges</InputLabel>
                      <Select
                        labelId="ranges-label"
                        required
                        multiple
                        renderValue={(selected) => selected.join(', ')}
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
                : <></>}

              <Typography variant="body1" gutterBottom>Configuration</Typography>
              <Controller
                name="config"
                control={control}
                render={({ field: {value, ...field}, fieldState: { error } }) => (
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

            </Stack>
          </CardContent>
          <CardActions>
            <Button disabled={isSubmitting} type="submit">Create</Button>
          </CardActions>
        </FormProvider>
      </Card>
    </Container>
  )
}

export default WebCreatePage;
