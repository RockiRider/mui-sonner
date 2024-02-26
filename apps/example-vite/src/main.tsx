import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "mui-sonner";
import { CircularProgress, Icon } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        closeIcon: (
          <Icon sx={{ width: 24, height: 24 }}>
            <CloseIcon />
          </Icon>
        ),
        loading: {
          icon: <CircularProgress size={20} color="secondary" />,
        },
      }}
    />
    <App />
  </React.StrictMode>
);
