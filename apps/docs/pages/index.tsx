import Container from "@mui/material/Container";
import { Button, Stack } from "@mui/material";
import Intro from "@features/home/Intro";
import { toast } from "mui-sonner";
import ToggleCustomTheme from "@features/theme/ThemeToggle";
import Install from "@features/home/Install";
import Features from "@features/home/Features";
import Usage from "@features/home/Usage";
import Types from "@features/home/Types";
import Position from "@features/home/Position";
import OtherOptions from "@features/home/OtherOptions";
import Styling from "@features/home/Styling";

export default function Home({
  toggleTheme,
  showCustomTheme,
}: {
  toggleTheme: () => void;
  showCustomTheme: boolean;
}) {
  return (
    <Container maxWidth="md">
      <Stack width={1} alignItems="center" gap={6}>
        <Intro />
        <Features />
        <Install />
        <Usage />
        <Types />
        <Position />
        <Styling />
        <OtherOptions />
        <ToggleCustomTheme
          showCustomTheme={showCustomTheme}
          toggleCustomTheme={toggleTheme}
        />
      </Stack>
    </Container>
  );
}
