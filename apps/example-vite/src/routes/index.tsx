import { createFileRoute } from "@tanstack/react-router";
import { Stack, Icon, CircularProgress } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Toaster, ToastPosition } from "mui-sonner";
import { z } from "zod";
import Advanced from "../features/Advanced";
import Basic from "../features/Basic";

type PositionParams = {
  position: ToastPosition | undefined;
  dir: "ltr" | "rtl" | undefined;
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>): PositionParams => {
    return {
      position: search.position
        ? z
            .enum([
              "top-left",
              "top-center",
              "top-right",
              "bottom-left",
              "bottom-center",
              "bottom-right",
            ])
            .parse(search.position as string)
        : undefined,
      dir: search.dir
        ? z.enum(["ltr", "rtl"]).parse(search.dir as string)
        : undefined,
    };
  },
});

function Index() {
  const { position, dir } = Route.useSearch();

  return (
    <Stack gap={2} alignItems="center" width={1}>
      <Toaster
        position={position}
        dir={dir}
        toastOptions={{
          closeIcon: (
            <Icon sx={{ width: 24, height: 24 }} data-testid="close_icon">
              <CloseIcon />
            </Icon>
          ),
          loading: {
            icon: (
              <CircularProgress
                size={20}
                color="secondary"
                data-testid="circular_progress"
              />
            ),
          },
        }}
      />
      <h1>Vite + React</h1>
      <Stack className="card" gap={2}>
        <Basic />
        <Advanced />
      </Stack>
    </Stack>
  );
}
