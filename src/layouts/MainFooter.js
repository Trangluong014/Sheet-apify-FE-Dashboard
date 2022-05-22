import { Stack, Typography } from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

function MainFooter() {
  return (
    <Stack
      spacing={2}
      sx={{ p: 3, px: 6, justifyContent: "flex-end" }}
      direction="row"
    >
      <Typography variant="body2" color="text.secondary" align="center" p={1}>
        Copyright © sheets-apify {new Date().getFullYear()} .
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <FacebookIcon />
        <LinkedInIcon />
        <GitHubIcon />
        <EmailIcon />
      </Stack>
    </Stack>
  );
}

export default MainFooter;
