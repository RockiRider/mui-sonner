import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "./assets/theme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
