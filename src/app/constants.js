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
    baseUrl: "https://sheetsapify-template1.netlify.app",
    defaultConfig: JSON.stringify(
      {
        theme: {
          palette: {
            type: "dark",
            primary: {
              main: "#ff8f00",
            },
            secondary: {
              main: "#f50057",
            },
            background: {
              default: "#310000",
              paper: "#731010",
            },
            text: {
              primary: "#fff",
              secondary: "rgba(255, 255, 255, 0.7)",
            },
          },
          typography: {
            fontFamily: "Do Hyeon",
          },
          shape: {
            borderRadius: 16,
          },
        },
      },
      null,
      2
    ),
  },
  template2: {
    component: (
      <Stack alignItems="center">
        <img src={noImage} style={{ width: 32, height: 32 }} />
        <div>Online Store</div>
      </Stack>
    ),
    baseUrl: "https://sheetsapify-template2.netlify.app",
    defaultConfig: JSON.stringify(
      {
        theme: {
          palette: {
            type: "light",
            primary: {
              main: "#3f51b5",
            },
            secondary: {
              main: "#f50057",
            },
            background: {
              default: "#fff",
              paper: "#fff",
            },
            text: {
              primary: "#rgba(0,0,0,0.87)",
              secondary: "rgba(0,0,0,0.6)",
            },
          },
          typography: {},
          shape: {
            borderRadius: 0,
          },
          shadows: [
            "none",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          ],
        },
        filter: [
          {
            label: "Gender",
            sheet: "GenderFilter",
          },
          {
            label: "Category",
            sheet: "CategoryFilter",
          },
          {
            label: "Price",
            sheet: "PriceFilter",
          },
        ],
      },
      null,
      2
    ),
  },
  template3: {
    component: (
      <Stack alignItems="center">
        <img src={noImage} style={{ width: 32, height: 32 }} />
        <div>Personal Expense</div>
      </Stack>
    ),
    baseUrl: "https://sheetsapify-template3.netlify.app",
    defaultConfig: JSON.stringify(
      {
        monthsToLoad: -1,
        theme: {
          palette: {
            type: "light",
            primary: {
              main: "#42a5f5",
            },
            secondary: {
              main: "#ba68c8",
            },
            background: {
              default: "#fff",
              paper: "#fff",
            },
            text: {
              primary: "#rgba(0,0,0,0.87)",
              secondary: "rgba(0,0,0,0.6)",
            },
          },

          shadows: [
            "none",
            "none",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
            "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
          ],
          shape: {
            borderRadius: 6,
          },
        },
      },
      null,
      2
    ),
  },
};

export const getWebsiteUrl = (website) =>
  `${TEMPLATE_OPTIONS[website.template].baseUrl}/${website.websiteId}`;
