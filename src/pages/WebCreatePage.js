import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

const WebsiteSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  spreadsheetUrl: Yup.string().url().required("Spreadsheet Url is require"),
  dataRange:Yup.string().required("Data Range is require"),
  template:Yup.string().required("Template is required"),

});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function WebCreatePage() {
  const methods = useForm({
    resolver: yupResolver(WebsiteSchema),
    defaultValues,
  });
  return (
    <>
    <Typography>Step 1: Choose your template</Typography>
    <Button>Template1</Button>
    <Button>Template2</Button>
    <Typography>Step 2: Fill your information</Typography>
    <FormProvider>

    </FormProvider>
    
    </>
  )
}

export default WebCreatePage;
