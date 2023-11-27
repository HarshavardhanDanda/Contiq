import type { Preview } from "@storybook/react";
import React from "react";
import "../src/App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../src/theme/theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];

export default preview;
