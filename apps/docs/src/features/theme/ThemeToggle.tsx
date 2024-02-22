import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ContrastIcon from "@mui/icons-material/Contrast";
interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

const ToggleCustomTheme = ({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>
          <ContrastIcon sx={{ fontSize: "20px", mr: 1 }} />
          Material Design
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ToggleCustomTheme;
