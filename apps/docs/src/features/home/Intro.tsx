import Link from "@components/Link";
import { Button, Card, Stack, Typography } from "@mui/material";
import { toast } from "mui-sonner";
import NextLink from "next/link";

const Intro = () => {
  return (
    <Stack alignItems="center">
      <Stack
        component={Card}
        sx={{
          mt: 20,
          maxWidth: 800,
          p: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={3}
      >
        <Typography variant="h4" component="h1">
          MUI-Sonner
        </Typography>
        <Typography variant="h6" component="h2">
          An opinionated toast library for Material UI and React
        </Typography>
        <Typography variant="body1" component="p">
          Based on the original{" "}
          <Link href="https://sonner.emilkowal.ski/">sonner</Link>
        </Typography>
        <Stack direction="row" gap={2}>
          <Button
            variant="contained"
            onClick={() =>
              toast("MUI Sonner", {
                description: "A simple toast library for MUI & React.",
              })
            }
          >
            Render a Toast
          </Button>
          <NextLink href="https://github.com/RockiRider/mui-sonner">
            <Button variant="outlined">Github</Button>
          </NextLink>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Intro;
