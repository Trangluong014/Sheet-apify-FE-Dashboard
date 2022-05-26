import { Stack } from "@mui/material";

import noImage from "../components/no-image.png";

const THEME_OPTIONS = {
  __meta: {
    description: "Change the looks of the website",
  },

  palette: {
    __meta: {
      label: "Palette",
      description: "Change the color of the website",
    },

    primary: {
      __meta: {
        label: "Primary color",
      },
      main: {
        __meta: {
          label: "Main",
          type: "color",
          defaulValue: "#1976d2",
        },
      },
      light: {
        __meta: {
          label: "Light",
          type: "color",
          defaulValue: "#42a5f5",
        },
      },
      dark: {
        __meta: {
          label: "Dark",
          type: "color",
          defaulValue: "#1565c0",
        },
      },
      constrastText: {
        __meta: {
          label: "Contrast Text",
          type: "color",
          defaulValue: "#fff",
        },
      },
    },
    secondary: {
      __meta: {
        label: "Secondary color",
      },
      main: {
        __meta: {
          label: "Main",
          type: "color",
          defaulValue: "#9c27b0",
        },
      },
      light: {
        __meta: {
          label: "Light",
          type: "color",
          defaulValue: "#ba68c8",
        },
      },
      dark: {
        __meta: {
          label: "Dark",
          type: "color",
          defaulValue: "#7b1fa2",
        },
      },
      constrastText: {
        __meta: {
          label: "Contrast Text",
          type: "color",
          defaulValue: "#fff",
        },
      },
    },
    background: {
      __meta: {
        label: "Background color",
        description: "Change the background color",
      },
      default: {
        __meta: {
          label: "Default background color",
          type: "color",
          defaulValue: "#fff",
        },
      },
      paper: {
        __meta: {
          label: "Paper background color",
          type: "color",
          defaulValue: "#fff",
        },
      },
    },

    text: {
      __meta: {
        label: "Text color",
        description: "Change text color",
      },
      primary: {
        __meta: {
          label: "Primary text color",
          type: "color",
          defaulValue: "rgba(0,0,0,0.87)",
        },
      },
      secondary: {
        __meta: {
          label: "Secondary text color",
          type: "color",
          defaulValue: "rgba(0,0,0,0.6)",
        },
      },
    },
  },
};

export const TEMPLATE_OPTIONS = {
  template1: {
    component: (
      <Stack alignItems="center">
        <img src={noImage} style={{ width: 32, height: 32 }} />
        <div>Hotel Booking</div>
      </Stack>
    ),
    baseUrl: "https://sheetsapify-template1.netlify.app",
    configTemplate: {
      __meta: {
        label: "Configuration",
      },
      theme: THEME_OPTIONS,
    },
    defaultConfig: {
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
  },
  template2: {
    component: (
      <Stack alignItems="center">
        <img src={noImage} style={{ width: 32, height: 32 }} />
        <div>Online Store</div>
      </Stack>
    ),
    baseUrl: "https://sheetsapify-template2.netlify.app",
    configTemplate: {
      __meta: {
        label: "Configuration",
      },
      theme: THEME_OPTIONS,
      // filter: {
      //   __meta: {
      //     label: "filter",
      //     type: "select",
      //     description: "Change the filter value of the website",
      //     select_option: [
      //       {
      //         label: "Gender",
      //         sheet: "GenderFilter",
      //       },
      //       {
      //         label: "Category",
      //         sheet: "CategoryFilter",
      //       },
      //       {
      //         label: "Price",
      //         sheet: "PriceFilter",
      //       },
      //     ],
      //   },
      // },
    },
    defaultConfig: {
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
  },
  template3: {
    component: (
      <Stack alignItems="center">
        <img src={noImage} style={{ width: 32, height: 32 }} />
        <div>Personal Expense</div>
      </Stack>
    ),
    baseUrl: "https://sheetsapify-template3.netlify.app",
    configTemplate: {
      __meta: {
        label: "Configuration",
      },
      monthsToLoad: {
        __meta: {
          label: "Months to load",
          type: "number",
        },
      },
      theme: THEME_OPTIONS,
    },
    defaultConfig: {
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
  },
};

export const getWebsiteUrl = (website) =>
  `${TEMPLATE_OPTIONS[website.template].baseUrl}/${website.websiteId}`;
