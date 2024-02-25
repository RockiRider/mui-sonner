import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});
