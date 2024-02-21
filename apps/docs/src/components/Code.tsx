import { Card, Paper, Typography, useTheme } from "@mui/material";

interface CodeProps {
  code: string;
}
const Code = ({ code }: CodeProps) => {
  const theme = useTheme();

  const currentMode = theme.palette.mode;
  const desiredBgColor =
    currentMode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black;

  const desiredTextColor =
    currentMode === "dark"
      ? theme.palette.common.black
      : theme.palette.common.white;
  return (
    <Paper
      sx={{
        backgroundColor: desiredBgColor,
        p: 2,
      }}
    >
      <Typography component="code" sx={{ color: desiredTextColor }}>
        {code}
      </Typography>
    </Paper>
  );
};
export default Code;
