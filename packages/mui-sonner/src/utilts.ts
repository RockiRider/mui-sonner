import { SxProps, Theme } from "@mui/material";

export const formatSx = (sx: SxProps<Theme> | undefined) => {
  if (!sx) return [];
  return [...(Array.isArray(sx) ? sx : [sx])];
};
