import "./App.css";

import { toast } from "mui-sonner";
import { Button, CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { appTheme } from "./assets/theme";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Stack gap={2} alignItems="center" width={1}>
        <h1>Vite + React</h1>
        <Stack className="card" gap={2}>
          <Button
            onClick={() => {
              toast("Update something", {
                closeButton: true,
                action: {
                  label: "Update",
                  onClick: () => {
                    alert("Updating...");
                  },
                },
              });
            }}
          >
            Action + Close
          </Button>
          <Button
            onClick={() =>
              toast.success("Save Successful", {
                description: "Your item has been saved.",
              })
            }
          >
            Success
          </Button>
          <Button
            onClick={() => {
              const prom = new Promise((resolve) => {
                setTimeout(() => {
                  resolve("Success");
                }, 3000);
              });

              toast.promise(prom, {
                loading: "Saving...",
                success: "Save Successful",
              });
            }}
          >
            Promise Success
          </Button>
          <Button
            onClick={() => {
              const prom = new Promise((_resolve, reject) => {
                setTimeout(() => {
                  reject("Error");
                }, 3000);
              });

              toast.promise(prom, {
                loading: "Saving...",
                error: "Save Failed",
              });
            }}
          >
            Promise Error
          </Button>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
