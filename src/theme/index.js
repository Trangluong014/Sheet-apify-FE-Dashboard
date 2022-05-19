import React from "react";
import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import customizeComponents from "./customizations";

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: {
        main: "rgba(58, 53, 65, 0.87)",
      },
      secondary: {
        main: "rgba(58, 53, 65, 0.68)",
      },
      background: {
        default: "rgb(244, 245, 250)",
        paper: "rgb(255, 255, 255)",
      },
    },
    text: {
      primary: "rgba(58, 53, 65, 0.87)",
      secondary: "rgb(138, 141, 147)",
      icon: "rgb(145, 85, 253)",
    },
    action: {
      active: "rgb(145, 85, 253)",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disable: "rgba(255, 255, 255, 0.3)",
      disableBackground: "rgba(255, 255, 255, 0.12)",
    },
    shape: { borderRadius: 8 },
  };

  const theme = createTheme(themeOptions);
  theme.components = customizeComponents(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
