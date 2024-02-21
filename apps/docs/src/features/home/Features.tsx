import { Box, Card, Icon, Paper, Stack, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
interface TickPairProps {
  text: string;
}
const TickPair = ({ text }: TickPairProps) => {
  return (
    <Stack gap={1} direction="row">
      <Icon>
        <DoneIcon />
      </Icon>
      <Typography>{text}</Typography>
    </Stack>
  );
};

const FEATURES_LIST = [
  "Easy to use",
  "Accessible",
  "Uses your theme",
  "Lightweight",
  "Pause on hover",
  "Headless Hooks",
  "Responsive",
  "Minimized toasts",
  "Dismiss on drag",
];

const Features = () => {
  return (
    <Stack
      gap={2}
      component={Paper}
      sx={{ p: 2, mb: 5 }}
      alignItems="center"
      elevation={0}
    >
      <Typography variant="h5">Features</Typography>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}
      >
        {FEATURES_LIST.map((feature) => (
          <TickPair text={feature} key={feature} />
        ))}
      </Box>
    </Stack>
  );
};

export default Features;
