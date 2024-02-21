import Container from "@mui/material/Container";
import { Button, Stack } from "@mui/material";
import Intro from "@features/home/Intro";
import { toast } from "mui-sonner";
import ToggleCustomTheme from "@features/theme/ThemeToggle";
import Install from "@features/home/Install";
import Features from "@features/home/Features";
import Usage from "@features/home/Usage";

export default function Home({
  toggleTheme,
  showCustomTheme,
}: {
  toggleTheme: () => void;
  showCustomTheme: boolean;
}) {
  return (
    <Container maxWidth="xl">
      <Stack width={1} alignItems="center" gap={6}>
        <Intro />
        <Features />
        <Install />
        <Usage />
        <Stack alignItems="center" gap={5}>
          <Button
            variant="contained"
            onClick={() =>
              toast.info("You have a new message!", {
                closeButton: true,
                duration: Infinity,
              })
            }
          >
            Info
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              toast.success("Successfully updated!", {
                duration: 20000,
                action: {
                  label: "Undo",
                  buttonSx: {
                    color: "inherit",
                    p: 0,
                    height: 30,
                    borderRadius: 0,
                  },
                  onClick: () => {
                    console.log("Info");
                  },
                },
              })
            }
          >
            Success
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              toast.error("Sorry something went wrong!", {
                variant: "filled",
              })
            }
          >
            Error
          </Button>
          <Button
            variant="contained"
            onClick={() => toast.warning("You have unsaved changes!")}
          >
            Warning
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              toast("Save Successful", {
                severity: "success",
                description: "Your item has been saved.",
                action: {
                  label: "Undo",
                  onClick: () => {
                    console.log("Undo");
                  },
                },
              });
            }}
          >
            Custom
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              toast.loading("Loading...", {
                id: "loader",
              });
              setTimeout(() => {
                toast.dismiss("loader");
              }, 1000);
            }}
          >
            Loading
          </Button>

          <Button variant="contained" onClick={() => toast.dismiss()}>
            Dismiss all
          </Button>
        </Stack>
        <ToggleCustomTheme
          showCustomTheme={showCustomTheme}
          toggleCustomTheme={toggleTheme}
        />
      </Stack>
    </Container>
  );
}
