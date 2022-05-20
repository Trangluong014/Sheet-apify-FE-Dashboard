import { Stack, Typography } from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

function MainFooter() {
  return (
    <Stack spacing={2} sx={{ p: 3 }} direction="row">
      <Stack key="facebook" direction="row" alignItems="center">
        <FacebookIcon />
      </Stack>
      <Stack key="linkedIn" direction="row" alignItems="center">
        <LinkedInIcon />
      </Stack>
      <Stack key="github" direction="row" alignItems="center">
        <GitHubIcon />
      </Stack>
      <Stack key="email" direction="row" alignItems="center">
        <EmailIcon />
      </Stack>
      <Typography variant="body2" color="text.secondary" align="center" p={1}>
        Copyright © Sheet-apify {new Date().getFullYear()} .
      </Typography>
    </Stack>
  );
}

export default MainFooter;
