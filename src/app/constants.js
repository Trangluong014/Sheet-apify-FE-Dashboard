import { Stack } from "@mui/material";

import noImage from "../components/no-image.png";

export const TEMPLATE_OPTIONS = {
  template1: {
    component: (
      <Stack alignItems="center">
        <img src={noImage} style={{ width: 32, height: 32 }} />
        <div>Hotel Booking</div>
      </Stack>
    ),
    baseUrl: "https://sheetapify-template1.netlify.app",
  },
  template2: {
    component: (
      <Stack alignItems="center">
        <img src={noImage} style={{ width: 32, height: 32 }} />
        <div>Online Store</div>
      </Stack>
    ),
    baseUrl: "https://sheetapify-template2.netlify.app",
  },
};

export const getWebsiteUrl = (website) =>
  `${TEMPLATE_OPTIONS[website.template].baseUrl}/${website.websiteId}`;
