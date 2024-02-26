import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "../assets/theme";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  ),
});
