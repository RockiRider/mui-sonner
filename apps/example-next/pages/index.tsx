import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { toast } from "mui-sonner";

export default function Home() {
  const successPromise = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Success");
      }, 2000);
    });
  };

  const errorPromise = () => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject("Error");
      }, 2000);
    });
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js example in TypeScript
        </Typography>
      </Box>
      <Stack alignItems="center" gap={5}>
        <Button
          variant="contained"
          onClick={() => toast.loading("You have a new message!")}
        >
          Info
        </Button>
        <Button
          variant="contained"
          onClick={() => toast.success("Successfully updated!")}
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
          onClick={() =>
            toast.promise(successPromise, {
              loading: "Loading...",
              success: "Loaded",
            })
          }
        >
          Promise Success
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            toast.promise(errorPromise, {
              loading: "Loading...",
              error: "Error",
            })
          }
        >
          Promise Error
        </Button>
        <Button
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

        <Button onClick={() => toast.dismiss()}>Dismiss all</Button>
      </Stack>
    </Container>
  );
}
